import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./invoiceState";
import { GetInvoicesDto } from "../../Data/InvoiceDtos/GetInvoicesDto";
import {
  getInvoiceById,
  getInvoices,
  getInvoiceTotalValues,
  getTotalValueDueReferenceMonth,
  uploadInvoice,
} from "./actions";
import { GetInvoiceTotalValues } from "../../Data/InvoiceDtos/GetInvoiceTotalValues";
import { GetTotalValueDueReferenceMonthDto } from "../../Data/InvoiceDtos/GetTotalValueDueReferenceMonthDto";
import { GetInvoiceDto } from "../../Data/InvoiceDtos/GetInvoiceDto";
import { notification } from "antd";

const invoiceSlice = createSlice({
  name: "invoiceValues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getInvoices.fulfilled,
        (state, action: PayloadAction<GetInvoicesDto>) => {
          state.invoices = [];
          state.error = "";
          state.invoices = action.payload.data;
          state.totalInvoices = action.payload.total;
          state.loading = false;
        }
      )
      .addCase(getInvoices.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getInvoiceTotalValues.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getInvoiceTotalValues.fulfilled,
        (state, action: PayloadAction<GetInvoiceTotalValues>) => {
          state.totalValueDue = action.payload.totalValueDue;
          state.avgValueDue = action.payload.avgValueDue;
          state.totalConsumptionKwh = action.payload.totalConsumptionKwh;
          state.avgConsumptionKwh = action.payload.avgConsumptionKwh;
        }
      )
      .addCase(getTotalValueDueReferenceMonth.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTotalValueDueReferenceMonth.fulfilled,
        (state, action: PayloadAction<GetTotalValueDueReferenceMonthDto[]>) => {
          state.totalValuesDueReferenceMonth = action.payload;
        }
      )
      .addCase(
        getInvoiceById.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        getInvoiceById.fulfilled,
        (state, action: PayloadAction<GetInvoiceDto>) => {
          state.invoice = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        uploadInvoice.fulfilled,
        (state) => {
          state.loading = false;
          state.uploadError = false;
          notification.success({
            description: "Files Uploaded",
            message: "Files Uploaded Successfully",
            placement: "top",
            duration: 3000,
          });
        }
      )
      .addCase(
        uploadInvoice.rejected,
        (state) => {
          state.uploadError = true;
          notification.error({
            message: "Error",
            description: "Error try again",
          });
        }
      )
  },
});

export default invoiceSlice.reducer;
