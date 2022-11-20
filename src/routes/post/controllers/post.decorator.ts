import { SetMetadata } from '@nestjs/common';

export const Posts = (...args: string[]) => SetMetadata('posts', args);
