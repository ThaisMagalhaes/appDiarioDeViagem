import { ViagemModel } from "../models";
import { IViagemRepository } from "../interfaces";
import { DataSource, Repository } from "typeorm";

export class ViagemRepository implements IViagemRepository {
    private repository: Repository<ViagemModel>

    constructor(database: DataSource){
        this.repository = database.getRepository(ViagemModel);
    }

    async criarViagem(viagem: Partial<ViagemModel>){
        console.log('repository')
        const novaViagem = this.repository.create({
            data: viagem.data,
            local: viagem.local
        })

        return await this.repository.save(novaViagem)
    }

    async obterTodasViagens(){
        return await this.repository.find()
    }
}