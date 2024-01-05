import { Card, Row } from "antd";
import { formatCurrency } from "../../../Utils/FormatCurrency";
import Item from "../../Item";
import { formatDate } from "../../../Utils/FormatDate";

interface IProps {
  invoiceNumber: string;
  referenceMonth: string;
  expirationDate: string;
  valueDue: number;
  instalationNumber: string;
  serie: number;
  emissionDate: string;
  accessKey: string;
  authorizationProtocol: string;
  invoiceCreatedAt: string;
  invoiceClass: string;
  subclass: string;
  lastReadDate: string;
  nextReadDate: string;
  currentReadDate: string;
  numberDays: number;
  consumptionKwh: number;
  currentReadValue: number;
  lastReadValue: number;
  qrCode: string;
  modualityTax: string;
  measurementType: string;
  measurement: string;
  multiplicationConstant: number;
  currentAccountGeneration: number;
  clientType: string;
  clientName: string;
  dateUploaded: string;
  loading: boolean;
}

const InvoiceDetailsCard = ({
  invoiceNumber,
  referenceMonth,
  expirationDate,
  valueDue,
  instalationNumber,
  consumptionKwh,
  serie,
  emissionDate,
  accessKey,
  authorizationProtocol,
  invoiceCreatedAt,
  invoiceClass,
  subclass,
  lastReadDate,
  nextReadDate,
  currentReadDate,
  numberDays,
  currentReadValue,
  lastReadValue,
  qrCode,
  modualityTax,
  measurementType,
  measurement,
  multiplicationConstant,
  currentAccountGeneration,
  loading,
  clientName,
  clientType,
  dateUploaded,
}: IProps) => {
  const oneLiner = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
  return (
    <Card>
      <Row gutter={[16, 24]} style={{ marginBottom: 16 }}>
        <Item
          title="Client"
          data={clientName}
          cols={{ ...oneLiner, lg: 4, xl: 4 }}
        />
        <Item
          title="Type"
          data={clientType}
          cols={{ ...oneLiner, lg: 4, xl: 4 }}
        />
      </Row>
      <Row gutter={[16, 16]}>
        <Item title="Invoice Number" data={invoiceNumber} copyIcon={true} />
        <Item
          title="Instalation Number"
          data={instalationNumber}
          copyIcon={true}
        />
        <Item title="Reference Month" data={referenceMonth} loading={loading} />
        <Item
          title="Value Due"
          data={formatCurrency(valueDue)}
          loading={loading}
        />
        <Item
          title="Consumption Kwh"
          data={`${consumptionKwh} kwh`}
          loading={loading}
        />
        <Item title="Serie" data={serie} loading={loading} />
        <Item title="Days" data={numberDays} loading={loading} />

        <Item
          title="Current Read Date"
          data={formatDate(currentReadDate)}
          loading={loading}
        />
        <Item
          title="Current Read Value"
          data={currentReadValue}
          loading={loading}
        />
        <Item
          title="Last Read Date"
          data={formatDate(lastReadDate)}
          loading={loading}
        />
        <Item title="Last Read Value" data={lastReadValue} loading={loading} />
        <Item
          title="Next Read Date"
          data={formatDate(nextReadDate)}
          loading={loading}
        />
        <Item
          title="Emission Date"
          data={formatDate(emissionDate)}
          loading={loading}
        />
        <Item
          title="Expiration Date"
          data={formatDate(expirationDate)}
          loading={loading}
        />
        <Item
          title="Invoice Created"
          data={formatDate(invoiceCreatedAt)}
          loading={loading}
        />
        <Item title="Class" data={invoiceClass} loading={loading} />
        <Item title="Sub Class" data={subclass} loading={loading} />
        <Item title="Modulaity Tax" data={modualityTax} loading={loading} />
        <Item
          title="Measurement Type"
          data={measurementType}
          loading={loading}
        />
        <Item title="Measurement" data={measurement} loading={loading} />
        <Item
          title="Multiplication Constatnt"
          data={multiplicationConstant}
          loading={loading}
        />
        <Item
          title="Account Generation"
          data={formatCurrency(currentAccountGeneration)}
          loading={loading}
        />
        <Item
          title="Date Uploaded"
          data={formatDate(dateUploaded)}
          loading={loading}
        />
        <Item
          title="QR Code"
          data={qrCode}
          cols={oneLiner}
          copyIcon={true}
          loading={loading}
        />
        <Item
          title="Access Key"
          data={accessKey}
          cols={oneLiner}
          copyIcon={true}
          hideText
          loading={loading}
        />
        <Item
          title="Authorization Protocol"
          data={authorizationProtocol}
          cols={oneLiner}
          copyIcon={true}
          hideText
          loading={loading}
        />
      </Row>
    </Card>
  );
};

export default InvoiceDetailsCard;
