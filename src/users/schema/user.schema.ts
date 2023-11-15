import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from 'src/auth/guards/roles/roles.decorator';
import { Base } from '../../utils/schemas/base.schema';
import { ROLE } from 'src/auth/guards/roles/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User extends Base{
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false})
  password: string;

  @Prop({ enum: ['user', 'admin'], default: ROLE.User,})
  role: string

  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  zipCode: string;

  @Prop({ required: false })
  street: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
