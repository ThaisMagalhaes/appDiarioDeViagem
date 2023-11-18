import { DataSource, type Repository } from 'typeorm';
import { type IViagemEntradaRepository } from '../interfaces';
import { ViagemEntradaModel } from '../models';

export class ViagemEntradaRepository implements IViagemEntradaRepository {
  private readonly repository: Repository<ViagemEntradaModel>;

  constructor(database: DataSource) {
    this.repository = database.getRepository(ViagemEntradaModel);
  }

  async criar(viagemEntrada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel> {
    const novaViagemEntrada = this.repository.create({
      data: viagemEntrada.data,
      local: viagemEntrada.local,
      descricao: viagemEntrada.descricao,
    });
    return await this.repository.save(novaViagemEntrada);
  }

  async obterTodas(localFiltro?: string): Promise<ViagemEntradaModel[]> {
    if (localFiltro) {
      return await this.repository.find({ where: { local: localFiltro } });
    } else {
      return await this.repository.find();
    }
  }

  async alterar(viagemEntradaAtualizada: Partial<ViagemEntradaModel>): Promise<ViagemEntradaModel | undefined> {
    const viagemEntradaOriginal = await this.repository.findOneOrFail({ where: { id: viagemEntradaAtualizada.id } });

    // Atualiza os campos desejados da viagem com os valores fornecidos
    Object.assign(viagemEntradaOriginal, viagemEntradaAtualizada);

    return await this.repository.save(viagemEntradaOriginal);
  }

  async excluir(id: number): Promise<boolean> {
    const viagemEntradaExistente = await this.repository.findOneOrFail({ where: { id } });

    await this.repository.remove(viagemEntradaExistente);
    return true;
  }
}
