import { Module } from '@nestjs/common';
import { databaseProviders } from './db.provider';

/**
 * Module to hide DB connection details, pretty much export a Fabric
 */
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DbModule {}
