import { IsEmail, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: any

    @IsOptional()
    @IsString()
    firstName?: any

    @IsString()
    @IsOptional()
    lastName?: any

}

export class DeleteUserDto {
    password: string;
}