import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Configs/axios";
import { GetInvoicesDto } from "../../Data/InvoiceDtos/GetInvoicesDto";
import { GetInvoiceTotalValues } from "../../Data/InvoiceDtos/GetInvoiceTotalValues";
import { GetTotalValueDueReferenceMonthDto } from "../../Data/InvoiceDtos/GetTotalValueDueReferenceMonthDto";
import { InvoiceParamsDto } from "../../Data/InvoiceDtos/InvoiceFilterDto";
import { GetInvoiceDto } from "../../Data/InvoiceDtos/GetInvoiceDto";

export const getInvoices = createAsyncThunk(
  "invoice/getInvoices",
  async (params?: InvoiceParamsDto): Promise<GetInvoicesDto> => {
    const { data } = await axios.get("/invoice", {
      params: params ? params : null,
    });
    return data;
  }
);

export const getInvoiceTotalValues = createAsyncThunk(
  "invoice/getInvoiceTotalValues",
  async (params?: InvoiceParamsDto): Promise<GetInvoiceTotalValues> => {
    const { data } = await axios.get("/invoice/getInvoiceTotalValues", {
      params: params ? params : null,
    });
    return data;
  }
);

export const getTotalValueDueReferenceMonth = createAsyncThunk(
  "invoice/getTotalValueDueReferenceMonth",
  async (params?: InvoiceParamsDto): Promise<GetTotalValueDueReferenceMonthDto[]> => {
    const { data } = await axios.get(
      "/invoice/getTotalValueDueReferenceMonth",
      {
        params: params ? params : null,
      }
    );
    return data;
  }
);

export const getInvoiceById = createAsyncThunk(
  "invoice/getInvoiceById",
  async (id: string): Promise<GetInvoiceDto> => {
    const { data } = await axios.get(
      `/invoice/getById/${id}`);
    return data;
  }
);

export const uploadInvoice = createAsyncThunk(
  "invoice/uploadInvoice",
  async (formData:FormData): Promise<GetInvoiceDto> => {
    const { data } = await axios.post(
      '/invoice', formData);
    return data;
  }
);
