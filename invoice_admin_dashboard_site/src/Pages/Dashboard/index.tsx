import useInvoice from "../../Hooks/Invoice";
import {InvoicesTable} from "../../Compoents/Invoices/InvoicesTable";
import { Col, Row } from "antd";
import "./index.scss";
import useInvoiceValues from "../../Hooks/InvoiceValues";
import TotalAvgCard from "../../Compoents/Invoices/TotalAvgCard";
import TotalInvoicesCard from "../../Compoents/Invoices/TotalInvoicesCard";
import TotalValuesDueRefMonthChart from "../../Compoents/Invoices/TotalValuesDueRefMonthChart";
import InvoiceFilter from "../../Compoents/Invoices/InvoiceFilter";

const Dashboard = () => {
  const {
    invoicesData,
    totalInvoices,
    totalValueDue,
    avgValueDue,
    totalConsumptionKwh,
    avgConsumptionKwh,
    totalValuesDueReferenceMonth,
    handleInvoiceSearch,
    setInvoiceFilter,
    invoiceFilter,
    reset
  } = useInvoice();
  const {
    electricEnergyTotalValue,
    electricEnergyAvgValue,
    energySceeTotalValue,
    energySceeAvgValue,
    energyCompensatedTotalValue,
    energyCompensatedAvgValue,
    contribLlumTotalValue,
    contribLlumAvgValue,
    bonusItaipuAvgValue,
    bonusItaipuTotalValue,
    accountFineTotalValue,
    accountFineAvgValue,
    accountTaxAvgValue,
    accountTaxTotalValue,
    accountCorrectionAvgValue,
    accountCorrectionTotalValue,
  } = useInvoiceValues();

  return (
    <div>
      <Row gutter={[16, 16]} className="dashboard__total-values">
      <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
          <InvoiceFilter handleInvoiceSearch={handleInvoiceSearch} setInvoiceFilter={setInvoiceFilter} reset={reset} />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
          <TotalValuesDueRefMonthChart data={totalValuesDueReferenceMonth} />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>
          <TotalAvgCard
            title="Invoices Values Due"
            totalValue={totalValueDue}
            avgValue={avgValueDue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>
          <TotalAvgCard
            title="Consumption kwh"
            totalValue={totalConsumptionKwh}
            avgValue={avgConsumptionKwh}
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>
          <TotalInvoicesCard
            title="Total Invoices"
            value={totalInvoices}
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Electric Energy"
            totalValue={electricEnergyTotalValue}
            avgValue={electricEnergyAvgValue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Energy Scee"
            totalValue={energySceeTotalValue}
            avgValue={energySceeAvgValue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Electric Compensated"
            totalValue={energyCompensatedTotalValue}
            avgValue={energyCompensatedAvgValue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Contrib Llum"
            totalValue={contribLlumTotalValue}
            avgValue={contribLlumAvgValue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Bonus Itaipu"
            totalValue={bonusItaipuTotalValue}
            avgValue={bonusItaipuAvgValue}
            type="currency"
          />
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Account Fine"
            totalValue={accountFineTotalValue}
            avgValue={accountFineAvgValue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Account Tax"
            totalValue={accountTaxTotalValue}
            avgValue={accountTaxAvgValue}
            type="currency"
          />
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
          <TotalAvgCard
            title="Account Correction"
            totalValue={accountCorrectionTotalValue}
            avgValue={accountCorrectionAvgValue}
            type="currency"
          />
        </Col>
      </Row>
      <InvoicesTable data={invoicesData} totalInvoices={totalInvoices} setInvoiceFilter={setInvoiceFilter} invoiceFilter={invoiceFilter} handleInvoiceSearch={handleInvoiceSearch}  />
    </div>
  );
};

export default Dashboard;
