import { IViagemRepository } from "core/database/interfaces";
import { ViagemModel } from "core/database/models";

export type CriarViagemProps = Omit<ViagemModel, 'id'>

export class ViagemService {
    constructor(private viagemRepository: IViagemRepository) { }

    async criarViagem({data, local}: CriarViagemProps){
        console.log('aqiuo')
        return await this.viagemRepository.criarViagem({
            data, local
        })
    }

    async obterTodasViagens() {
        return await this.viagemRepository.obterTodasViagens()
    }
}