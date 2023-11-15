import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {hasOwner} from "../../utils/schemas/owner.schema";
export type ItemDocument = HydratedDocument<Item>;

@Schema({timestamps: true})
export class Item extends hasOwner{
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
