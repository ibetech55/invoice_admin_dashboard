import {
  GetClientDto,
  IGetClient,
} from "../../../Data/Client/ClientDtos";
import { IClientRepository } from "../../../Repository/client.repository/IClient.repsoitory";

export class GetClientByIdUseCase {
  private readonly _clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this._clientRepository = clientRepository;
  }

  async execute(id:number): Promise<GetClientDto> {
    const data: IGetClient = await this._clientRepository.findById(id);
    const values:GetClientDto = {
      id: data.id,
      name: data.name,
      clientNumber: data.client_number,
      streetAddress: data.street_address,
      zipCode: data.zip_code,
      city: data.city,
      state: data.state,
      type: data.type,
      taxIdentifier: data.tax_identifier,
      stateInscription: data.state_inscription,
      createdAt: data.created_at
    }

    return values
  }
}
