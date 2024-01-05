export interface GetClientsDto {
    data:GetClientsDataDto[],
    total: number;
}

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