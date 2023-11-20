import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";

import { UserInfoDto } from "./UserInfoDto.dto";

export class UserInfoPswDto extends UserInfoDto{

    @IsOptional()
    @IsString()
    @IsEmail()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly surname: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
