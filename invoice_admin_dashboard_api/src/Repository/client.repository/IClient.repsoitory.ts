import {  IGetClient, IGetClients } from "../../Data/Client/ClientDtos"


export interface IClientRepository {
  find():Promise<IGetClients>
  findById(id: number):Promise<IGetClient>
}
