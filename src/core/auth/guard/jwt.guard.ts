import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
    constructor() {
        super();
    }
    handleRequest(err: any, user: any) {
        if (!user || !user.id) {
            throw (
                err ||
                new UnauthorizedException({
                    error_code: "UNAUTHORIZED",
                    message: "Lütfen giriş yapınız.",
                })
            );
        }
        return user;
    }
}