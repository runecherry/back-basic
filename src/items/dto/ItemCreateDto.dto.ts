import {IsNotEmpty, IsNumber, IsString} from "class-validator";

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

}
