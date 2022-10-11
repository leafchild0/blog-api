import { Connection } from 'mongoose';

import { PostsSchema } from './posts.schema';

export const postsProviders = [
  {
    provide: 'Post',
    useFactory: (connection: Connection) =>
      connection.model('Client', PostsSchema),
    inject: ['DbConnectionToken'],
  },
];
