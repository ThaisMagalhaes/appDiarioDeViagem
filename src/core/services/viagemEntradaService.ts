import { IViagemEntradaRepository } from 'core/database/interfaces';
import { ViagemEntradaModel } from 'core/database/models';

export type CriarViagemEntradaProps = Omit<ViagemEntradaModel, 'id'>;

export class ViagemEntradaService {
  constructor(private readonly viagemEntradaRepository: IViagemEntradaRepository) {}

  async criar(viagemEntrada: CriarViagemEntradaProps) {
    return await this.viagemEntradaRepository.criar(viagemEntrada);
  }

  async obterTodas(local?: string) {
    return await this.viagemEntradaRepository.obterTodas();
  }

  async alterar(
    id: number,
    viagemEntradaAtualizada: Partial<ViagemEntradaModel>
  ): Promise<ViagemEntradaModel | undefined> {
    return await this.viagemEntradaRepository.alterar(viagemEntradaAtualizada);
  }

  async excluir(id: number): Promise<boolean> {
    return await this.viagemEntradaRepository.excluir(id);
  }
}
