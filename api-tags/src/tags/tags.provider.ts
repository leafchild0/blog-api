import { Connection } from 'mongoose';

import { TagsSchema } from './tags.schema';

export const tagsProviders = [
  {
    provide: 'Tag',
    useFactory: (connection: Connection) =>
      connection.model('Client', TagsSchema),
    inject: ['DbConnectionToken'],
  },
];
