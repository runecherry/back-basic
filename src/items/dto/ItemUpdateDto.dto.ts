import {IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { ItemCreateDto } from "./ItemCreateDto.dto";

export class ItemUpdateDto extends ItemCreateDto {

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
