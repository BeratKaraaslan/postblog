import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
    delete(arg0: {}) {
        throw new Error('Method not implemented.');
    }
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url:  config.get('DATABASE_URL')
                },
            },
        });
    }

    cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ]);
    }
}
