import { ViagemEntradaModel } from '../models';

export interface IViagemEntradaRepository {
  criar(viagemEntrada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel>;
  obterTodas(local?: string): Promise<ViagemEntradaModel[]>;

  alterar(viagemEntrada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel>;

  excluir(id: number): Promise<boolean>;
}
