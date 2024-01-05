import { GetClientsController } from "../../../Controller/Client.Controllers/GetClients";
import { GetClientsUseCase } from "../../../Presentation/Client/GetClients";
import { ClientRepository } from "../../../Repository/client.repository";

const clientRepository = new ClientRepository();
const getClientsUseCase = new GetClientsUseCase(clientRepository);
const getClientsController = new GetClientsController(getClientsUseCase);

export { getClientsUseCase, getClientsController };
