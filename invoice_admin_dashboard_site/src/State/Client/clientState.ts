import { GetClientDto } from "../../Data/ClientDtos/GetClientDto";
import { GetClientsDataDto } from "../../Data/ClientDtos/GetClientsDto";

export interface ClientsState {
  clients: GetClientsDataDto[];
  totalClients: number;
  loading: boolean;
  client: GetClientDto;
}

export const initialState: ClientsState = {
  clients: [],
  totalClients: 0,
  loading: false,
  client:{
    id: -1,
    name: "",
    clientNumber: "",
    streetAddress: "",
    zipCode: "",
    city: "",
    state: "",
    type: "",
    taxIdentifier: "",
    stateInscription: "",
    createdAt: new Date()
  }
};
