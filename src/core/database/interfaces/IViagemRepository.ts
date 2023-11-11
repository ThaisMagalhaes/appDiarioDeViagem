import { ViagemModel } from "../models";

export interface IViagemRepository {
    criarViagem(viagem: Partial<ViagemModel>): Promise<ViagemModel>
    obterTodasViagens(): Promise<ViagemModel[]>
}