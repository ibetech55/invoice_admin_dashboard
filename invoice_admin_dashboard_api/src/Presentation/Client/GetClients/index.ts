import {
  GetClientsDataDto,
  GetClientsDto,
  IGetClients,
  IGetClientsData,
} from "../../../Data/Client/ClientDtos";
import { IClientRepository } from "../../../Repository/client.repository/IClient.repsoitory";

export class GetClientsUseCase {
  private readonly _clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this._clientRepository = clientRepository;
  }

  async execute(): Promise<GetClientsDto> {
    const data: IGetClients = await this._clientRepository.find();
    const values: GetClientsDataDto[] = data.data.map(
      (x: IGetClientsData) => ({
        id: x.id,
        name: x.name,
        clientNumber: x.client_number,
        streetAddress: x.street_address,
        zipCode: x.zip_code,
        city: x.city,
        state: x.state,
        type: x.type,
      })
    );

    return {
      data: values,
      total: data.total,
    };
  }
}
