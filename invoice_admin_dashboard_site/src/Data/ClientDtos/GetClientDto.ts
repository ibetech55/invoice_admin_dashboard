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