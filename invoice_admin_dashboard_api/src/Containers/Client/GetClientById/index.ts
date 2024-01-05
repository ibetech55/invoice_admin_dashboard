import { GetClientByIdController } from "../../../Controller/Client.Controllers/GetClientById";
import { GetClientByIdUseCase } from "../../../Presentation/Client/GetClientById";
import { ClientRepository } from "../../../Repository/client.repository";

const clientRepository = new ClientRepository();
const getClientByIdUseCase = new GetClientByIdUseCase(clientRepository);
const getClientByIdController = new GetClientByIdController(getClientByIdUseCase);

export { getClientByIdUseCase, getClientByIdController };
