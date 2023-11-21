import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString} from "class-validator";

export class OrderCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly itemId: string;

    @IsNotEmpty()
    @IsString()
    readonly gymId: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    note: string;

}
