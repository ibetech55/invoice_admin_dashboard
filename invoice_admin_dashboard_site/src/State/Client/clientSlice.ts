import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getClientById, getClients } from "./actions";
import { GetClientsDto } from "../../Data/ClientDtos/GetClientsDto";
import { initialState } from "./clientState";
import { GetClientDto } from "../../Data/ClientDtos/GetClientDto";


const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClients.fulfilled, (state, action: PayloadAction<GetClientsDto>) => {
        state.loading = false;
        state.clients = action.payload.data
        state.totalClients = action.payload.total
      })
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientById.fulfilled, (state, action: PayloadAction<GetClientDto>) => {
        state.loading = false;
        state.client = action.payload
      })
  },
});

export default clientSlice.reducer;
