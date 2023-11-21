import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Prop} from "@nestjs/mongoose";

export class ItemCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly code: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly date: string;

    @IsNotEmpty()
    @IsNumber()
    readonly duration: number;

    @IsNotEmpty()
    @IsNumber()
    readonly slots: number;

}
