import {IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import { Types } from "mongoose";
import { ROLE } from "src/auth/guards/roles/role.enum";

export class UserInfoDto {
    @IsOptional()
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly type_courses: string;

    @IsOptional()
    @IsString()
    readonly surname: string;

    @IsOptional()
    @IsString()
    readonly identityCard: string;

    @IsOptional()
    @IsString()
    readonly city: string;

    @IsOptional()
    @IsString()
    readonly street: string;

    @IsOptional()
    @IsString()
    readonly zipCode: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ROLE)
    readonly role: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
