import { ViagemEntradaImagemModel } from '../models';

export interface IViagemEntradaImagemRepository {
  criar(viagemEntradaImagem: Partial<ViagemEntradaImagemModel>): Promise<ViagemEntradaImagemModel>;

  obterTodas(): Promise<ViagemEntradaImagemModel[]>;

  excluir(id: number): Promise<boolean>;
}
