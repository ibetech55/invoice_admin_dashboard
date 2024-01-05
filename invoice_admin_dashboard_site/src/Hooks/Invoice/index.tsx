/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../State";
import {
  getInvoiceById,
  getInvoices,
  getInvoiceTotalValues,
  getTotalValueDueReferenceMonth,
} from "../../State/Invoice/actions";
import { GetInvoicesDataDto } from "../../Data/InvoiceDtos/GetInvoicesDto";
import { GetTotalValueDueReferenceMonthDto } from "../../Data/InvoiceDtos/GetTotalValueDueReferenceMonthDto";
import {
  InvoiceFilterDto,
  InvoiceParamsDto,
} from "../../Data/InvoiceDtos/InvoiceFilterDto";
import { formatMonthToIsoDate } from "../../Utils/FormatMonthToIsoDate";
import { GetInvoiceDto } from "../../Data/InvoiceDtos/GetInvoiceDto";

interface IUseInvocie {
  invoicesData: GetInvoicesDataDto[];
  totalInvoices: number;
  totalValueDue: number;
  avgValueDue: number;
  totalConsumptionKwh: number;
  avgConsumptionKwh: number;
  totalValuesDueReferenceMonth: GetTotalValueDueReferenceMonthDto[];
  handleInvoiceSearch: () => void;
  invoiceFilter: InvoiceFilterDto;
  setInvoiceFilter: (invoiceFilter: InvoiceFilterDto) => void;
  reset: ()=>void;
  handleGetInvoice:(id: string)=> void;
  invoiceData:GetInvoiceDto;
  loading:boolean;
  uploadInvoice: (value:any)=>void
}

const useInvoice = (): IUseInvocie => {
  const invoiceData = useSelector((state: RootState) => state.invoice);
  const dispatch = useDispatch<AppDispatch>();
  const [invoiceFilter, setInvoiceFilter] = useState<InvoiceFilterDto>({
    invoiceNumber: undefined,
    referenceMonth: undefined,
    minValueDue: undefined,
    maxValueDue: undefined,
    minConsumptionKwh: undefined,
    maxConsumptionKwh: undefined,
    expirationDateStart: undefined,
    expirationDateEnd: undefined,
    page: 1,
    limit: 10
  });

  const uploadInvoice = (value:any) => {
    console.log(value, 666)
  }

  const reset = () => {
    dispatch(getInvoices());
    dispatch(getInvoiceTotalValues());
    dispatch(getTotalValueDueReferenceMonth());
  }

  const handleGetInvoice = (id: string) => {
    dispatch(getInvoiceById(id));
  }

  const handleGetInvoices = useCallback(() => {
    const params: InvoiceParamsDto = {
      invoiceNumber: invoiceFilter.invoiceNumber ? invoiceFilter.invoiceNumber : undefined,
      referenceMonth: invoiceFilter.referenceMonth
        ? formatMonthToIsoDate(invoiceFilter.referenceMonth)
        : undefined,
      minValueDue: invoiceFilter.minValueDue ? invoiceFilter.minValueDue : undefined,
      maxValueDue: invoiceFilter.maxValueDue ? invoiceFilter.maxValueDue : undefined,
      minConsumptionKwh: invoiceFilter.minConsumptionKwh
        ? invoiceFilter.minConsumptionKwh
        : undefined,
      maxConsumptionKwh: invoiceFilter.maxConsumptionKwh
        ? invoiceFilter.maxConsumptionKwh
        : undefined,
      expirationDateStart: invoiceFilter.expirationDateStart
        ? invoiceFilter.expirationDateStart
        : undefined,
      expirationDateEnd: invoiceFilter.expirationDateEnd
        ? invoiceFilter.expirationDateEnd
        : undefined,
        page: invoiceFilter.page || 1,
        limit: invoiceFilter.limit || 10,
    };
    dispatch(getInvoices(params));
    dispatch(getInvoiceTotalValues(params));
    dispatch(getTotalValueDueReferenceMonth(params));
  }, [invoiceFilter, dispatch]);

  return {
    invoicesData: invoiceData.invoices,
    totalInvoices: invoiceData.totalInvoices,
    totalValueDue: invoiceData.totalValueDue,
    avgValueDue: invoiceData.avgValueDue,
    totalConsumptionKwh: invoiceData.totalConsumptionKwh,
    avgConsumptionKwh: invoiceData.avgConsumptionKwh,
    totalValuesDueReferenceMonth: invoiceData.totalValuesDueReferenceMonth,
    handleInvoiceSearch: handleGetInvoices,
    invoiceFilter,
    setInvoiceFilter,
    reset,
    handleGetInvoice,
    invoiceData:invoiceData.invoice,
    loading: invoiceData.loading,
    uploadInvoice
  };
};

export default useInvoice;
