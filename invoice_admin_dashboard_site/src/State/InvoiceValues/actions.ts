import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Configs/axios";
import { GetEnergyTotalValuesDto } from "../../Data/InvoiceValuesDtos/GetEnergyTotalValuesDto";

export const getEnergyTotalInvoiceValues = createAsyncThunk(
  "invoiceValues/getEnergyTotalInvoiceValues",
  async (): Promise<GetEnergyTotalValuesDto> => {
    const { data } = await axios.get('/invoiceValues/totalEnergyValues');
    return data;
  }
);
