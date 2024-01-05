import { Router } from "express";
import { getClientsController } from "../Containers/Client/GetClients";
import { getClientByIdController } from "../Containers/Client/GetClientById";

const clientRoutes = Router();
clientRoutes.get("/client", (req, res) => getClientsController.handle(req, res));
clientRoutes.get("/client/getById/:id", (req, res) => getClientByIdController.handle(req, res));

export { clientRoutes };