import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from 'src/auth/guards/roles/roles.decorator';
import { Base } from '../../utils/schemas/base.schema';
import { ROLE } from 'src/auth/guards/roles/role.enum';
import {STATUS_ORDER} from "../../utils/enums/status_order.enum";
import {GYM_TYPE} from "../../utils/enums/type_gym";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User extends Base{
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false})
  password: string;

  @Prop({ enum: ['user', 'admin', 'gym'], default: ROLE.User,})
  role: string

  @Prop({ required: false })
  identityCard: string;

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  zipCode: string;

  @Prop({ required: false })
  street: string;

  @Prop({ enum: GYM_TYPE, default: GYM_TYPE.FULL, required: false })
  type_courses: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
