import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./Invoice/invoiceSlice";
import invoiceValuesSlice from "./InvoiceValues/invoiceValuesSlice";
import clientSlice from "./Client/clientSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceSlice,
    invoiceValues: invoiceValuesSlice,
    client: clientSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;