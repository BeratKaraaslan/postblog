import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { AuthDto, AuthSignin } from "../models";


@ApiTags("Auth")
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('/signup')
    async signup(@Body() dto: AuthDto) {

        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    async signin(@Body() dto: AuthSignin) {
        console.log("sdasdsad")
        return this.authService.signin(dto);
    }
}