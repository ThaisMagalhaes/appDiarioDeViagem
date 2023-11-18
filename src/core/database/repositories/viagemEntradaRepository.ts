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

  async obterTodas(): Promise<ViagemEntradaModel[]> {
    return await this.repository.find();
  }

  async alterar(
    id: number,
    viagemEntradaAtualizada: Partial<ViagemEntradaModel>
  ): Promise<ViagemEntradaModel | undefined> {
    const viagemEntradaOriginal = await this.repository.findOne({ where: { id } });

    if (!viagemEntradaOriginal) {
      return undefined;
    }

    // Atualiza os campos desejados da viagem com os valores fornecidos
    Object.assign(viagemEntradaOriginal, viagemEntradaAtualizada);

    return await this.repository.save(viagemEntradaOriginal);
  }

  async excluir(id: number): Promise<boolean> {
    const viagemEntradaExistente = await this.repository.findOne({ where: { id } });

    if (!viagemEntradaExistente) {
      return false;
    }

    await this.repository.remove(viagemEntradaExistente);
    return true;
  }
}
