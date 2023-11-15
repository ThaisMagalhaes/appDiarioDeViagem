import * as SQLite from 'expo-sqlite';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ViagemModel } from './models';

const entities = [ViagemModel];

export const databaseConfiguration: DataSourceOptions = {
  database: 'diarioviagem2.db',
  type: 'expo',
  driver: SQLite,
  entities,
  logging: true,
  synchronize: true,
};

export const connection = new DataSource(databaseConfiguration);
