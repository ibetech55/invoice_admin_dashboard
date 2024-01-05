import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./Invoice/invoiceSlice";
import invoiceValuesSlice from "./InvoiceValues/invoiceValuesSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceSlice,
    invoiceValues: invoiceValuesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;