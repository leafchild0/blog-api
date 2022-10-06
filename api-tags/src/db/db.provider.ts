import { connect } from 'mongoose';
import { MONGO_URI } from '../common/config';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => connect(MONGO_URI, { dbName: 'tags' }),
  },
];
