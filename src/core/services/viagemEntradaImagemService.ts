import { IViagemEntradaImagemRepository } from 'core/database/interfaces';
import { ViagemEntradaImagemModel } from 'core/database/models';

export type CriarViagemEntradaImagemProps = Omit<ViagemEntradaImagemModel, 'id'>;

export class ViagemEntradaImagemService {
  constructor(private readonly viagemEntradaImagemRepository: IViagemEntradaImagemRepository) {}

  async criar(viagemEntradaImagem: CriarViagemEntradaImagemProps) {
    return await this.viagemEntradaImagemRepository.criar(viagemEntradaImagem);
  }

  async obterTodas() {
    return await this.viagemEntradaImagemRepository.obterTodas();
  }

  async excluir(id: number): Promise<boolean> {
    return await this.viagemEntradaImagemRepository.excluir(id);
  }
}
