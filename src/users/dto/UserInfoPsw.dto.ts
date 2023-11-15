import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { UserInfoDto } from "./UserInfoDto.dto";

export class UserInfoPswDto extends UserInfoDto{

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
