import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  getHello(): string {
    return 'Hello World!';
  }
}
