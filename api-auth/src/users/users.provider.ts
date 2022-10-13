import { Connection } from 'mongoose';

import { UsersSchema } from './users.schema';

export const usersProviders = [
  {
    provide: 'User',
    useFactory: (connection: Connection) =>
      connection.model('Client', UsersSchema),
    inject: ['DbConnectionToken'],
  },
];
