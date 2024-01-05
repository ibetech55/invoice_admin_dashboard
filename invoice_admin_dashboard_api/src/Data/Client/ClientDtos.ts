export interface GetClientsDataDto {
    id: number;
    name: string;
    clientNumber: string;
    streetAddress: string;
    zipCode: string;
    city: string;
    state: string;
    type: string;
}

export interface GetClientDto {
    id: number;
    name: string;
    clientNumber: string;
    streetAddress: string;
    zipCode: string;
    city: string;
    state: string;
    type: string;
    taxIdentifier: string;
    stateInscription: string;
    createdAt:Date;
}

export interface IGetClientsData {
    id: number;
    name: string;
    client_number: string;
    street_address: string;
    zip_code: string;
    city: string;
    state: string;
    type: string;
}

export interface IGetClient {
    id: number;
    name: string;
    client_number: string;
    street_address: string;
    zip_code: string;
    city: string;
    state: string;
    type: string;
    tax_identifier: string;
    state_inscription: string;
    created_at:Date;
}

export interface IGetClients {
    data:IGetClientsData[],
    total: number;
}

export interface GetClientsDto {
    data:GetClientsDataDto[],
    total: number;
}