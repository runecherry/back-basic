import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { Model, Types } from 'mongoose';
import { OrderUpdateDto } from './dto/OrderUpdateDto.dto';
import { OrderCreateDto } from './dto/OrderCreateDto.dto';
import {STATUS_ORDER} from "../utils/enums/status_order.enum";

@Injectable()

export class OrderService{
    //Order.name return function names
    constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>){}

    generateObjectId(id: string | Types.ObjectId): Types.ObjectId{
        try {
          if(id instanceof Types.ObjectId)
            return id
          const objectId = new Types.ObjectId(id)
          return objectId;
        } catch (error) {
          console.log({ ConvertToObjectId: error})
          return null
        }

      }

      async create(userId: string| Types.ObjectId, orderCreateDto: OrderCreateDto): Promise<Order | null>{
        try {
          const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
            throw new HttpException('User Id wrong', 409)
          const order = await this.OrderModel.create({...orderCreateDto, owner:userIdObject, lastUpdatedBy: userIdObject })
          return order;
        } catch (error) {
          console.log({ CreationOrderError: error})
          return null
        }
      }

      async findAll(userId: string| Types.ObjectId, isAdmin: boolean, isGym: boolean) {
        try {
          const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
            throw new HttpException('User Id wrong', 409)
            const list = isAdmin
            ? await this.OrderModel.find().populate("owner").populate("itemId").populate("gymId").exec()
            : await this.OrderModel.find({[isGym?'gymId' :'owner']: userIdObject}).populate("itemId").populate("gymId").exec();
          return list
        } catch (error) {
          console.log({ErrorListOrders: error})
          return {ErrorListOrders: error}
        }
      }

      async findOneById(id: string | Types.ObjectId, userId: string| Types.ObjectId, isAdmin: boolean): Promise<Order | { FindOrderError: Error}>{
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
            const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
              throw new HttpException('User Id wrong', 409)
          const order = isAdmin
          ? await this.OrderModel.findById(objectId).populate("owner").populate("itemId")
          : await this.OrderModel.findOne({_id: objectId, owner: userIdObject }).populate("owner").populate("itemId");
          if(!order)
            throw new HttpException('Order not found!', 404);
          return order
        } catch (error) {
            console.log({ FindOrderError: error})
            return { FindOrderError: error}
        }
      }

      async findOneByOrderName(OrderName: {OrderName: string}, userId: string| Types.ObjectId, isAdmin: boolean): Promise<Order |  null> {
        try {
          const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
            throw new HttpException('User Id wrong', 409)
          const order = isAdmin
          ? await this.OrderModel.findOne(OrderName).exec()
          : await this.OrderModel.findOne({...OrderName, owner: userIdObject}).exec()
          //console.log(order)
          if(!order)
            throw new HttpException('Order not found!', 404);
          return order
        } catch (error) {
            console.log({ FindOrderByNameError: error})
            return null
        }
      }

      async activateOne(id: string, userId: string, isAdmin: boolean){
        const body: OrderUpdateDto = new OrderUpdateDto()
        body.isActive = true
        return await this.updateOne(id, userId, isAdmin, body)
      }

      async cancelOne(id: string, userId: string, isAdmin: boolean){
        const body: OrderUpdateDto = new OrderUpdateDto()
        body.status = STATUS_ORDER.CANCELLED
        return await this.updateOne(id, userId, isAdmin, body)
      }


      async deactivateOne(id: string, userId: string, isAdmin: boolean){
        const body: OrderUpdateDto = new OrderUpdateDto()
        body.isActive = false
        return await this.updateOne(id, userId, isAdmin, body)
      }

      async updateOne(id: string, userId: string, isAdmin: boolean, body: OrderUpdateDto) {
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const userIdObject = this.generateObjectId(userId)
            if(!userIdObject)
              throw new HttpException('User Id wrong', 409)

          const order = isAdmin
          ? await this.OrderModel.findByIdAndUpdate(objectId, {...body, lastUpdatedBy: userIdObject}, {new: true})
          : await this.OrderModel.findOneAndUpdate({_id: objectId, owner: userIdObject}, {...body, lastUpdatedBy: userIdObject}, {new: true})

          if(!order)
            throw new HttpException('Order not found!', 404);
          return order;
        } catch (error) {
          console.log({ UpdateOrderError: error})
            return { UpdateOrderError: error}
        }
      }

      async deleteOne(id: string): Promise<object>{
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const order = await this.OrderModel.findByIdAndDelete(objectId)
          if(!order)
            throw new HttpException('Order not found!', 404);
          return order;
        } catch (error) {
          console.log({ DeleteOrderError: error})
            return { DeleteOrderError: error}
        }

      }
}
