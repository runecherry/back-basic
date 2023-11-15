import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schema/user.schema'
import {Base} from "./base.schema";

export type hasOwnerDocument = HydratedDocument<hasOwner>;

@Schema()
export class hasOwner extends Base{

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

}

export const hasOwnerSchema = SchemaFactory.createForClass(hasOwner);
