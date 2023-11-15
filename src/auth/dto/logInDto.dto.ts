import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogInDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
