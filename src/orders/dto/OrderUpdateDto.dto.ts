import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { OrderCreateDto } from "./OrderCreateDto.dto";

export class OrderUpdateDto extends OrderCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly itemId: string;

    @IsNotEmpty()
    @IsString()
    readonly gymId: string;

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
