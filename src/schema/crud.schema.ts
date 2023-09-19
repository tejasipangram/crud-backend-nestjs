import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Crud>;

@Schema()
export class Crud {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const CrudSchema = SchemaFactory.createForClass(Crud);
