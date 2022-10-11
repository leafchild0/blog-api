import { connect, Mongoose } from 'mongoose';
import { MONGO_URI } from '../common/config';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<Mongoose> =>
      connect(MONGO_URI, { dbName: 'posts' }),
  },
];
