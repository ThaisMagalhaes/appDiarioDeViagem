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
    const novaViagem = this.repository.create({ data: viagem.data, local: viagem.local });
    return await this.repository.save(novaViagem);
  }

  async obterTodas(): Promise<ViagemModel[]> {
    return await this.repository.find();
  }
}
