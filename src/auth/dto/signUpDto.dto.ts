import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, isEnum } from "class-validator";
import { ROLE } from "../guards/roles/role.enum";

export class SignUpDto {
    @IsNotEmpty()
    @IsString({
        // here, $constraint1 will be replaced with "10", and $value with actual supplied value
        message: 'Expect a String',
      })
      @MinLength(5, {
        // here, $constraint1 will be replaced with "10", and $value with actual supplied value
        message: 'Username is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @IsString()
    @IsEnum(ROLE)
    readonly role: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10, {
        // here, $constraint1 will be replaced with "10", and $value with actual supplied value
        message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
      })
    readonly password: string;
}
