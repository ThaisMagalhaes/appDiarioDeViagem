import * as SQLite from 'expo-sqlite';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ViagemModel, ViagemEntradaModel } from './models';

const entities = [ViagemModel, ViagemEntradaModel];

export const databaseConfiguration: DataSourceOptions = {
  database: 'diarioviagem.db',
  type: 'expo',
  driver: SQLite,
  entities,
  logging: true,
  synchronize: true,
};

export const connection = new DataSource(databaseConfiguration);
