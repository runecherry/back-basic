import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { UserDto } from './dto/UserDto.dto';
import { SignUpDto } from '../auth/dto/signUpDto.dto';
import { UserInfoDto } from './dto/UserInfoDto.dto';
import { UserInfoPswDto } from './dto/UserInfoPsw.dto';

@Injectable()

export class UserService{
    //User.name return function names
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>){}

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

      async create(signUpDto: SignUpDto): Promise<UserDto | null | {CreationUserError: Error}>{
        const user = new this.UserModel({...signUpDto})
        await user.save()
        return user;
      }

      async findAll() {
        try {
          return await this.UserModel.find().exec();
        } catch (error) {
          console.log({ErrorListUseres: error})
          return {ErrorListUseres: error}
        }
      }

      async findOneById(id: string | Types.ObjectId): Promise<UserInfoDto | null>{
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const user = await this.UserModel.findById(objectId);
          if(!user)
            throw new HttpException('User not found!', 404);
          return user
        } catch (error) {
            console.log({ FindUserError: error})
            return null
        }
      }

      //only one that returns password
      async findOneByUsername(username: {username: string}): Promise<UserInfoPswDto |  null> {
        try {
          //console.log(username)
          const user : UserInfoPswDto = await this.UserModel.findOne(username).select('+password').exec();
          //console.log(user)
          if(!user)
            throw new HttpException('User not found!', 404);
          return user
        } catch (error) {
            console.log({ FindUserError: error})
            return null
        }
      }

      async updateOne(id: string, userId: string, body: UserInfoDto) {
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const thisUser = this.generateObjectId(userId);

          const user = await this.UserModel.findByIdAndUpdate(objectId, {...body, lastUpdatedBy: thisUser}, {new: true})

          if(!user)
            throw new HttpException('User not found!', 404);
          return user;
        } catch (error) {
          console.log({ UpdateUserError: error})
            return { UpdateUserError: error}
        }

      }

      async activateOne(id: string, userId: string, isAdmin: boolean){
        const body: UserInfoDto = new UserInfoDto()
        body.isActive = true
        return await this.updateOne(id, userId, body)
      }

      async deactivateOne(id: string, userId: string, isAdmin: boolean){
        const body: UserInfoDto = new UserInfoDto()
        body.isActive = false
        return await this.updateOne(id, userId, body)
      }

      async deleteOne(id: string): Promise<object>{
        try {
          const objectId = this.generateObjectId(id);
          if(!objectId)
            throw new HttpException('Id not valid!', 409);
          const user = await this.UserModel.findByIdAndDelete(objectId)
          if(!user)
            throw new HttpException('User not found!', 404);
          return user;
        } catch (error) {
          console.log({ DeleteUserError: error})
            return { DeleteUserError: error}
        }

      }
}
