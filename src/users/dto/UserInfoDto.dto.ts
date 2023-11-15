import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { ROLE } from "src/auth/guards/roles/role.enum";

export class UserInfoDto {
    @IsNotEmpty()
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ROLE)
    readonly role: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}
