import * as SQLite from 'expo-sqlite';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ViagemModel } from './models';

const entities = [
  ViagemModel
]

// Conexão com o Banco de Dados do Sqlite 
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};

export const databaseConfiguration: DataSourceOptions = {
  database: "diarioviagem.db",
  type: "expo",
  driver: SQLite,
  entities,
  logging: true,
  synchronize: true,
};

export const connection = new DataSource(databaseConfiguration);
