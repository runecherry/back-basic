import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hasOwner } from './hasOwner.shema';

export type BaseTypeAccessDocument = HydratedDocument<BaseTypeAccess>;

@Schema()
export class BaseTypeAccess extends hasOwner{

  @Prop({ required: false, enum: ['general', 'personalized'], default: 'personalized' })
  type_access: string;
}

export const BaseTypeAccessSchema = SchemaFactory.createForClass(BaseTypeAccess)