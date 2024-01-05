import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../State";
import { GetClientsDataDto } from "../../Data/ClientDtos/GetClientsDto";
import { getClientById, getClients } from "../../State/Client/actions";
import { GetClientDto } from "../../Data/ClientDtos/GetClientDto";

interface IUseClient {
  clientsData: GetClientsDataDto[];
  totalClients: number;
  loading: boolean;
  handleGetClients: () => void;
  handleGetClient: (id:string) => void;
  clientData: GetClientDto;
}

const useClient = (): IUseClient => {
  const clientData = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch<AppDispatch>();

  const handleGetClients = useCallback(() => {
    dispatch(getClients());
  }, [dispatch]);


  const handleGetClient = (id: string) => {
    dispatch(getClientById(id));
  }

  return {
    clientsData: clientData.clients,
    totalClients: clientData.totalClients,
    loading: clientData.loading,
    handleGetClients,
    handleGetClient,
    clientData: clientData.client
  };
};

export default useClient;
