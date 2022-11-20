import {
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;


    @IsString()
    @IsNotEmpty()
    body: string;


    @IsString()
    @IsNotEmpty()
    imageUrl: string;

}


export class UpdatePostDto {

    @IsString()
    title?: string;

    @IsString()
    description?: string;


    @IsString()
    body?: string;


    @IsString()
    imageUrl?: string;
}