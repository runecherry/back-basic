import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Item} from 'src/items/schema/item.schema'
import { STATUS_ORDER } from 'src/utils/enums/status_order.enum';
import { hasOwner } from 'src/utils/schemas/hasOwner.shema';
import {User} from "../../users/schema/user.schema";
export type OrderDocument = HydratedDocument<Order>;

@Schema({timestamps: true})
export class Order extends hasOwner{

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true })
  itemId: Item;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  gymId: Item;

  @Prop({ enum: STATUS_ORDER, default: STATUS_ORDER.BOUGHT })
  status: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: true })
  date: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
