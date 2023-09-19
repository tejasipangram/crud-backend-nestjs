import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Crud } from './schema/crud.schema';
import { Model } from 'mongoose';
import { Simpleresponse } from './simpleresponse/simpleresponse.interface';
import * as path from 'path';
@Injectable()
export class AppService {
  constructor(@InjectModel(Crud.name) private crudModel: Model<Crud>) {}
  async getAllData(): Promise<Crud[]> {
    const data = await this.crudModel.find().exec();
    return data;
  }

  async create(body, file): Promise<Crud> {
    const { title, description } = body;
    const image = file.filename;
    console.log(image);
    console.log(path.join(__dirname, '..', image));

    // console.log(image, file);
    const data = await new this.crudModel({ title, description, image });

    return await data.save();
  }

  async update(id: string, body): Promise<Crud> {
    const { title, description, image } = body;
    console.log(title, description, image);
    const data = await this.crudModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
      },
      { new: true },
    );

    const result = await data.save();
    console.log(result);
    return result;
  }

  async delete(id): Promise<Simpleresponse> {
    await this.crudModel.findByIdAndDelete(id);

    return { success: true, message: 'List deleted successfully' };
  }
}
