import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schema/item.schema';
import { Model, Types } from 'mongoose';
import { ItemUpdateDto } from './dto/ItemUpdateDto.dto';
import { ItemCreateDto } from './dto/ItemCreateDto.dto';

@Injectable()

export class ItemService{
    //Item.name return function names
    constructor(@InjectModel(Item.name) private ItemModel: Model<ItemDocument>){}

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

      async create(userId: string| Types.ObjectId, itemCreateDto: ItemCreateDto): Promise<Item | null>{
        try {
          const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
            throw new HttpException('User Id wrong', 409)
          const item = await this.ItemModel.create({...itemCreateDto, owner:userIdObject, lastUpdatedBy: userIdObject })
          return item;
        } catch (error) {
          console.log({ CreationItemError: error})
          return null
        }
      }

      async findAll(userId: string| Types.ObjectId, isAdmin: boolean) {
        try {
          const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
            throw new HttpException('User Id wrong', 409)
            const list = isAdmin
            ? await this.ItemModel.find().exec()
            : await this.ItemModel.find({isActive: true}).exec();
          return list
        } catch (error) {
          console.log({ErrorListItems: error})
          return {ErrorListItems: error}
        }
      }

      async findOneById(id: string | Types.ObjectId, userId: string| Types.ObjectId, isAdmin: boolean): Promise<Item | { FindItemError: Error}>{
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
            const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
              throw new HttpException('User Id wrong', 409)
          const item = isAdmin
          ? await this.ItemModel.findById(objectId)
          : await this.ItemModel.findOne({_id: objectId, isActive: true });
          if(!item)
            throw new HttpException('Item not found!', 404);
          return item
        } catch (error) {
            console.log({ FindItemError: error})
            return { FindItemError: error}
        }
      }

      async findOneByItemName(ItemName: {ItemName: string}, userId: string| Types.ObjectId, isAdmin: boolean): Promise<Item |  null> {
        try {
          const userIdObject = this.generateObjectId(userId)
          if(!userIdObject)
            throw new HttpException('User Id wrong', 409)
          const item = isAdmin
          ? await this.ItemModel.findOne(ItemName).exec()
          : await this.ItemModel.findOne({...ItemName, owner: userIdObject}).exec()
          //console.log(item)
          if(!item)
            throw new HttpException('Item not found!', 404);
          return item
        } catch (error) {
            console.log({ FindItemByNameError: error})
            return null
        }
      }

      async activateOne(id: string, userId: string, isAdmin: boolean){
        const body: ItemUpdateDto = new ItemUpdateDto()
        body.isActive = true
        return await this.updateOne(id, userId, isAdmin, body)
      }

      async deactivateOne(id: string, userId: string, isAdmin: boolean){
        const body: ItemUpdateDto = new ItemUpdateDto()
        body.isActive = false
        return await this.updateOne(id, userId, isAdmin, body)
      }

      async updateOne(id: string, userId: string, isAdmin: boolean, body: ItemUpdateDto) {
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const userIdObject = this.generateObjectId(userId)
            if(!userIdObject)
              throw new HttpException('User Id wrong', 409)

          const item = isAdmin
          ? await this.ItemModel.findByIdAndUpdate(objectId, {...body, lastUpdatedBy: userIdObject}, {new: true})
          : await this.ItemModel.findOneAndUpdate({_id: objectId, owner: userIdObject}, {...body, lastUpdatedBy: userIdObject}, {new: true})

          if(!item)
            throw new HttpException('Item not found!', 404);
          return item;
        } catch (error) {
          console.log({ UpdateItemError: error})
            return { UpdateItemError: error}
        }
      }

      async deleteOne(id: string): Promise<object>{
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const item = await this.ItemModel.findByIdAndDelete(objectId)
          if(!item)
            throw new HttpException('Item not found!', 404);
          return item;
        } catch (error) {
          console.log({ DeleteItemError: error})
            return { DeleteItemError: error}
        }

      }
}
