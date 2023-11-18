import { DataSource, type Repository } from 'typeorm';
import { type IViagemRepository } from '../interfaces';
import { ViagemModel } from '../models';

export class ViagemRepository implements IViagemRepository {
  private readonly repository: Repository<ViagemModel>;

  constructor(database: DataSource) {
    this.repository = database.getRepository(ViagemModel);
  }

  async criar(viagem: Partial<ViagemModel>): Promise<ViagemModel> {
    console.log('repositorio', viagem);
    const novaViagem = this.repository.create({
      data: viagem.data,
      local: viagem.local,
      finalizado: viagem.finalizado,
    });
    return await this.repository.save(novaViagem);
  }

  async obterTodas(): Promise<ViagemModel[]> {
    return await this.repository.find();
  }

  async alterar(id: number, viagemAtualizada: Partial<ViagemModel>): Promise<ViagemModel | undefined> {
    const viagemOriginal = await this.repository.findOne({ where: { id } });

    if (!viagemOriginal) {
      return undefined;
    }

    // Atualiza os campos desejados da viagem com os valores fornecidos
    Object.assign(viagemOriginal, viagemAtualizada);

    return await this.repository.save(viagemOriginal);
  }

  async excluir(id: number): Promise<boolean> {
    const viagemExistente = await this.repository.findOne({ where: { id } });

    if (!viagemExistente) {
      return false;
    }

    await this.repository.remove(viagemExistente);
    return true;
  }
}
