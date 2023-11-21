import {IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class OrderCreateDto {
    @IsNotEmpty()
    @IsArray()
    readonly items: Array<Object>;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsOptional()
    @IsString()
    note: string;

}
