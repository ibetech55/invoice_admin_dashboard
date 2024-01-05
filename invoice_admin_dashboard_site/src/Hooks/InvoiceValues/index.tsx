import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../State";
import { getEnergyTotalInvoiceValues } from "../../State/InvoiceValues/actions";

 interface IUseInvoiceValues {
  electricEnergyTotalValue: number;
  energySceeTotalValue: number;
  energyCompensatedTotalValue: number;
  contribLlumTotalValue: number;
  electricEnergyAvgValue: number;
  energySceeAvgValue: number;
  energyCompensatedAvgValue: number;
  contribLlumAvgValue: number;
  bonusItaipuAvgValue: number;
  bonusItaipuTotalValue: number;
  accountFineAvgValue: number;
  accountFineTotalValue: number;
  accountTaxAvgValue: number;
  accountTaxTotalValue: number;
  accountCorrectionAvgValue: number;
  accountCorrectionTotalValue: number;
  loading: boolean;
}
const useInvoiceValues = (): IUseInvoiceValues => {
  const invoiceValuesData = useSelector((state: RootState) => state.invoiceValues);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEnergyTotalInvoiceValues());
  }, [dispatch]);
  return {
    electricEnergyTotalValue:invoiceValuesData.electricEnergyTotalValue ,
    energySceeTotalValue: invoiceValuesData.energySceeTotalValue,
    energyCompensatedTotalValue: invoiceValuesData.energyCompensatedTotalValue,
    contribLlumTotalValue: invoiceValuesData.contribLlumTotalValue,
    electricEnergyAvgValue:invoiceValuesData.electricEnergyAvgValue ,
    energySceeAvgValue: invoiceValuesData.energySceeAvgValue,
    energyCompensatedAvgValue: invoiceValuesData.energyCompensatedAvgValue,
    contribLlumAvgValue: invoiceValuesData.contribLlumAvgValue,
    bonusItaipuAvgValue: invoiceValuesData.bonusItaipuAvgValue,
    bonusItaipuTotalValue: invoiceValuesData.bonusItaipuTotalValue,
    accountFineAvgValue: invoiceValuesData.accountFineAvgValue,
    accountFineTotalValue: invoiceValuesData.accountFineTotalValue,
    accountTaxAvgValue: invoiceValuesData.accountTaxAvgValue,
    accountTaxTotalValue: invoiceValuesData.accountTaxTotalValue,
    accountCorrectionAvgValue: invoiceValuesData.accountCorrectionAvgValue,
    accountCorrectionTotalValue: invoiceValuesData.accountCorrectionTotalValue,
    loading:invoiceValuesData.loading
  };
};

export default useInvoiceValues;
