import {IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import { Types } from "mongoose";
import { ROLE } from "src/auth/guards/roles/role.enum";

export class UserDto {
    @IsNotEmpty()
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsBoolean()
    readonly isActive: boolean;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ROLE)
    readonly role: string;
}
