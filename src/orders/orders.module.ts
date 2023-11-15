import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/schema/order.schema';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature(
        [
            { name: Order.name, schema: OrderSchema }
         ]
       ),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
