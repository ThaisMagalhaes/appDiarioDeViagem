import * as SQLite from 'expo-sqlite';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ViagemModel, ViagemEntradaModel, ViagemEntradaImagemModel } from './models';

const entities = [ViagemModel, ViagemEntradaModel, ViagemEntradaImagemModel];

export const databaseConfiguration: DataSourceOptions = {
  database: 'diarioviagem.db',
  type: 'expo',
  driver: SQLite,
  entities,
  logging: true,
  synchronize: true,
};

export const connection = new DataSource(databaseConfiguration);
