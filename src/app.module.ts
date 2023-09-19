import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Crud, CrudSchema } from './schema/crud.schema';
import { MulterModule } from '@nestjs/platform-express';
import { customStorage } from './file';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crud.name, schema: CrudSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://developertejas2405:admin@cluster0.ef6pwur.mongodb.net/nest-crud?retryWrites=true&w=majority',
    ),
    MulterModule.register({ dest: 'uploads', storage: customStorage }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
