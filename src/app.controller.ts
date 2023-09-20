import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  FileValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Crud } from './schema/crud.schema';
import { Simpleresponse } from './simpleresponse/simpleresponse.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { FileType } from './validators/Validatefile';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { query } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('read/:userId')
  getAllData(
    @Param('userId') userid,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize,
  ): Promise<Simpleresponse> {
    return this.appService.getAllData(page, pageSize, userid);
  }

  @Post('create/:userid')
  @UseInterceptors(FileInterceptor('image'))
  createOne(
    @Param('userid') userid,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    @FileType(['image/jpg', 'image/png'])
    file: Express.Multer.File,
    @Body() body,
  ): Promise<Simpleresponse> {
    return this.appService.create(body, file, userid);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateOne(@Param('id') id, @Body() body): Promise<Crud> {
    return this.appService.update(id, body);
  }

  @Delete(':id')
  deleteOne(@Param('id') id): Promise<Simpleresponse> {
    return this.appService.delete(id);
  }
}
//  {
//   storage: diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.random() * 1e9;
//       const etext = extname(file.originalname);
//       const fileName = `${file.originalname}-${uniqueSuffix}${etext}`;

//       cb(null, fileName);
//     },
//   }
//}
