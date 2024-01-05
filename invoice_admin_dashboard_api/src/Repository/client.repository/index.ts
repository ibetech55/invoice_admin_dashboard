import { PrismaClient } from "@prisma/client";
import { IClientRepository } from "./IClient.repsoitory";
import { IGetClients, IGetClient } from "../../Data/Client/ClientDtos";

export class ClientRepository implements IClientRepository {
  async find(): Promise<IGetClients> {
    try {
      const data = await this.prisma.clients.findMany();
      const total = await this.prisma.invoices.count();
      return { data, total };
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: number): Promise<IGetClient> {
    try {
      const data = await this.prisma.clients.findUnique({ where: { id } });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  private prisma = new PrismaClient();
}
