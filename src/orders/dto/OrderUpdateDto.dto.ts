import {IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";
import { OrderCreateDto } from "./OrderCreateDto.dto";

export class OrderUpdateDto extends OrderCreateDto {
    @IsNotEmpty()
    @IsArray()
    readonly items: Array<Object>;

    @IsOptional()
    @IsString()
    date: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    note: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
