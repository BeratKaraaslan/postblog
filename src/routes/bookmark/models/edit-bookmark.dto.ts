import {
    IsOptional,
    IsString,
} from 'class-validator';

export class EditBookmarkDto {
    @IsString()
    @IsOptional()
    title?: any;

    @IsString()
    @IsOptional()
    description?: any;

    @IsString()
    @IsOptional()
    link?: any;
}