import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/routes/auth/controllers/get-user.decorator';
import { JwtGuard } from '../../../core/auth/guard';
import { EditUserDto } from '../models';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('/me')
    getMe(@GetUser() user: User) {

        return user;
    }


    @Patch()
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    async deleteUserById(@GetUser() user: User, @Body() password: string) {

        const passwordString = Object.values<String>(password)
        const pwStr = passwordString.toString()

        return await this.userService.deleteUser(user.id, pwStr, user.hash);
    }
}
