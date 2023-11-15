import { IViagemRepository } from 'core/database/interfaces';
import { ViagemModel } from 'core/database/models';

export type CriarViagemProps = Omit<ViagemModel, 'id'>;

export class ViagemService {
  constructor(private readonly viagemRepository: IViagemRepository) {}

  async criar(viagem: CriarViagemProps) {
    return await this.viagemRepository.criar(viagem);
  }

  async obterTodas() {
    return await this.viagemRepository.obterTodas();
  }
}
