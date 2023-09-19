import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Crud } from './schema/crud.schema';
import { Simpleresponse } from './simpleresponse/simpleresponse.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllData(): Promise<Crud[]> {
    return this.appService.getAllData();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createOne(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ): Promise<Crud> {
    return this.appService.create(body, file);
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
