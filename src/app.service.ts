import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Crud } from './schema/crud.schema';
import { Model } from 'mongoose';
import { Simpleresponse } from './simpleresponse/simpleresponse.interface';
import * as path from 'path';
@Injectable()
export class AppService {
  constructor(@InjectModel(Crud.name) private crudModel: Model<Crud>) {}
  async getAllData(page, pageSize, userid): Promise<Simpleresponse> {
    const data = await this.crudModel
      .find({ UserId: userid })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalItems = await this.crudModel.countDocuments({ UserId: userid });
    console.log(data);

    return {
      success: true,
      data,
      page,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  async create(body, file, userid: string): Promise<Simpleresponse> {
    const { title, description } = body;
    const image = file.filename;

    console.log(image);
    console.log(path.join(__dirname, '..', image));

    // console.log(image, file);
    const data = await new this.crudModel({
      title,
      description,
      filePath: image,
      UserId: userid,
    });
    await data.save();
    return { success: true, message: 'List added', data };
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
