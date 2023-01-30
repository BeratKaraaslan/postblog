import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { CreateBookmarkDto } from "src/routes/bookmark/models";
import { CreatePostDto } from "src/routes/post/models/posts-dto";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}


export class AuthSignin {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}


const authUser: CreatePostDto = {
    "title": "",
    "description":"",
    "body": "",
    "imageUrl": ""
}
