import {IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

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

    @IsOptional()
    @IsString()
    note: string;

}
