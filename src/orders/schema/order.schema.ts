import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Item} from 'src/items/schema/item.schema'
import { TYPE_ORDER } from 'src/utils/enums/type_order.enum';
import { STATUS_ORDER } from 'src/utils/enums/status_order.enum';
import { hasOwner } from 'src/utils/schemas/hasOwner.shema';
export type OrderDocument = HydratedDocument<Order>;

@Schema({timestamps: true})
export class Order extends hasOwner{
  @Prop({ required: true,
    type: [{
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    qta: {type: Number, default: 1}
  }]
  })
  items: [{
    item_id: Item,
    qta: number
  }];

  @Prop({ required: true, enum: STATUS_ORDER, default: STATUS_ORDER.BOUGHT })
  status: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: true })
  date: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
