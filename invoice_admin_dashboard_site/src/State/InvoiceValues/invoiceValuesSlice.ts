import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./invoiceValuesState";
import { getEnergyTotalInvoiceValues } from "./actions";
import { GetEnergyTotalValuesDto } from "../../Data/InvoiceValuesDtos/GetEnergyTotalValuesDto";

const invoceValuesSlice = createSlice({
  name: "invoiceValues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnergyTotalInvoiceValues.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEnergyTotalInvoiceValues.fulfilled,
        (state, action: PayloadAction<GetEnergyTotalValuesDto>) => {
          state.error = "";
          state.electricEnergyTotalValue = action.payload.electricEnergyTotalValue;
          state.energySceeTotalValue = action.payload.energySceeTotalValue;
          state.energyCompensatedTotalValue = action.payload.energyCompensatedTotalValue;
          state.contribLlumTotalValue = action.payload.contribLlumTotalValue;
          state.electricEnergyAvgValue = action.payload.electricEnergyAvgValue;
          state.energySceeAvgValue = action.payload.energySceeAvgValue;
          state.energyCompensatedAvgValue = action.payload.energyCompensatedAvgValue;
          state.contribLlumAvgValue = action.payload.contribLlumAvgValue;
          state.bonusItaipuAvgValue = action.payload.bonusItaipuAvgValue;
          state.bonusItaipuTotalValue = action.payload.bonusItaipuTotalValue;

          state.accountTaxAvgValue = action.payload.accountTaxAvgValue;
          state.accountFineAvgValue = action.payload.accountFineAvgValue;
          state.accountCorrectionAvgValue = action.payload.accountCorrectionAvgValue;

          state.accountTaxTotalValue = action.payload.accountTaxTotalValue;
          state.accountFineTotalValue = action.payload.accountFineTotalValue;
          state.accountCorrectionTotalValue = action.payload.accountCorrectionTotalValue;

          state.loading = false;
        }
      )
      .addCase(getEnergyTotalInvoiceValues.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default invoceValuesSlice.reducer;
