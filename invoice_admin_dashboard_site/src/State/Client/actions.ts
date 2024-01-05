/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Configs/axios";
import { GetClientsDto } from "../../Data/ClientDtos/GetClientsDto";
import { GetClientDto } from "../../Data/ClientDtos/GetClientDto";

export const getClients = createAsyncThunk(
  "client/getClients",
  async (): Promise<GetClientsDto> => {
    const { data } = await axios.get("/client");
    return data;
  }
);

export const getClientById = createAsyncThunk(
  "client/getClientById",
  async (id: string): Promise<GetClientDto> => {
    const { data } = await axios.get(`/client/getById/${id}`);
    return data;
  }
);
