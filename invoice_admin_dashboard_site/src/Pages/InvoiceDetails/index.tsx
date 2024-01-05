import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useInvoice from "../../Hooks/Invoice";
import { Card, Col, Row } from "antd";
import InvoiceDetailsCard from "../../Compoents/InvoiceDetails/InvoiceDetailsCard";
import InvoiceValuesCard from "../../Compoents/InvoiceDetails/InvoceValuesCard";
import ConsumptionHistoryCard from "../../Compoents/Invoices/ConsumptionHistoryCard";

const InvoiceDetails = () => {
  const { id } = useParams();
  const { handleGetInvoice, invoiceData, loading } = useInvoice();

  useEffect(() => {
    if (id) {
      handleGetInvoice(id);
    }
  }, []);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card>
            <h1>Invoice Details: {invoiceData.invoiceNumber}</h1>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <InvoiceDetailsCard
            invoiceNumber={invoiceData.invoiceNumber}
            instalationNumber={invoiceData.instalationNumber}
            referenceMonth={invoiceData.referenceMonth}
            valueDue={invoiceData.valueDue}
            serie={invoiceData.serie}
            emissionDate={invoiceData.emissionDate}
            accessKey={invoiceData.accessKey}
            authorizationProtocol={invoiceData.authorizationProtocol}
            invoiceCreatedAt={invoiceData.invoiceCreatedAt}
            consumptionKwh={invoiceData.consumptionkwh}
            expirationDate={invoiceData.expirationDate}
            numberDays={invoiceData.numberDays}
            currentReadDate={invoiceData.currentReadDate}
            lastReadDate={invoiceData.lastReadDate}
            nextReadDate={invoiceData.nextReadDate}
            currentReadValue={invoiceData.currentReadValue}
            lastReadValue={invoiceData.lastReadValue}
            qrCode={invoiceData.qrCode}
            invoiceClass={invoiceData.class}
            subclass={invoiceData.subclass}
            modualityTax={invoiceData.modualityTax}
            measurementType={invoiceData.measurementType}
            measurement={invoiceData.measurement}
            multiplicationConstant={invoiceData.multiplicationConstant}
            currentAccountGeneration={invoiceData.currentAccountGeneration}
            clientName={invoiceData.client.name}
            clientType={invoiceData.client.type}
            dateUploaded={invoiceData.createdAt}
            loading={loading}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <InvoiceValuesCard
            electricEnergy={invoiceData.invoiceValues.electricEnergy}
            energyScee={invoiceData.invoiceValues.energyScee}
            energyCompensated={invoiceData.invoiceValues.energyCompensated}
            contribLlumPublicMunicipalVal={
              invoiceData.invoiceValues.contribLlumPublicMunicipalVal
            }
            bonusItaipuVal={invoiceData.invoiceValues.bonusItaipuVal}
            accountFine={invoiceData.invoiceValues.accountFine}
            accountTax={invoiceData.invoiceValues.accountTax}
            accountCorrection={invoiceData.invoiceValues.accountCorrection}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <ConsumptionHistoryCard data={invoiceData.consumptionHistory} />
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceDetails;
