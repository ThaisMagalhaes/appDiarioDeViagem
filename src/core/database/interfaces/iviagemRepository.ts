import { type ViagemModel } from '../models';

export interface IViagemRepository {
  criar(viagem: Partial<ViagemModel>): Promise<ViagemModel>;

  obterTodas(): Promise<ViagemModel[]>;
}
