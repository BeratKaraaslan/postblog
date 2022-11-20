import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { EditUserDto } from '../models';
import * as argon from 'argon2';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async editUser(
        userId: number,
        dto: EditUserDto,
    ) {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
            },
        });

        delete user.hash;

        return user;
    }

    async deleteUser(userId: number, password: string, hashedpassword: string) {

        const passwordHash = await argon.hash(password)

        if (hashedpassword === passwordHash) {

            const bookmark = await this.prisma.bookmark.deleteMany({
                where: {
                    userId: userId
                }
            })
            const user = await this.prisma.user.delete({
                where: {
                    id: userId,
                },
            });

            return bookmark && user

        } else {
            return "Hatalı şifre girdiniz!"
        }
    }
}