import { Card, Table } from "antd";
import { GetInvoicesDataDto } from "../../../Data/InvoiceDtos/GetInvoicesDto";
import { Link } from "react-router-dom";
import { formatMonthYear } from "../../../Utils/FormatMonthYear";
import { formatDate } from "../../../Utils/FormatDate";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../Utils/FormatCurrency";
import { InvoiceFilterDto } from "../../../Data/InvoiceDtos/InvoiceFilterDto";

interface IProps {
  data: GetInvoicesDataDto[];
  totalInvoices: number;
  invoiceFilter: InvoiceFilterDto;
  setInvoiceFilter: (invoiceFilter: InvoiceFilterDto) => void;
  handleInvoiceSearch: () => void;
}

interface DataType {
  key: React.Key;
  id: string;
  invoiceNumber: string;
  referenceMonth: string;
  expirationDate: string;
  valueDue: string;
  consumptionKwh: number;
  clientName: string;
  city: string;
  state: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Invoice Number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
    width: 140,
    render: (val: string, row:DataType) => <Link to={`/${row.key}`}>{val}</Link>,
  },
  {
    title: "Reference Month",
    dataIndex: "referenceMonth",
    key: "referenceMonth",
    width: 140,
  },
  {
    title: "Expiration Date",
    dataIndex: "expirationDate",
    key: "expirationDate",
    width: 140,
  },
  {
    title: "Value Due",
    dataIndex: "valueDue",
    key: "valueDue",
    width: 140,
  },
  {
    title: "Consumption kwh",
    dataIndex: "consumptionKwh",
    key: "consumptionKwh",
    width: 140,
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
    width: 140,
    render: (val: string) => <Link to="/">{`${val.substring(0, 11)}...`}</Link>,
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    width: 140,
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    width: 75,
  },
];

const InvoicesTable = ({
  data,
  totalInvoices,
  invoiceFilter,
  setInvoiceFilter,
  handleInvoiceSearch,
}: IProps) => {
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    if (invoiceFilter.page !== undefined  && invoiceFilter.limit) {
      handleInvoiceSearch();
    }
  }, [invoiceFilter.page, invoiceFilter.limit, handleInvoiceSearch]);

  useEffect(() => {
    if (data) {
      const arr: DataType[] = data.map((x: GetInvoicesDataDto) => ({
        key: Number(x.id),
        id: x.invoiceNumber,
        invoiceNumber: x.invoiceNumber,
        referenceMonth: formatMonthYear(x.referenceMonth),
        expirationDate: formatDate(x.expirationDate),
        valueDue: formatCurrency(x.valueDue),
        consumptionKwh: x.consumptionKwh,
        clientName: x.client.name,
        city: x.client.city,
        state: x.client.state,
      }));
      setTableData(arr);
    }
  }, [data]);
  return (
    <Card
      style={{
        boxShadow:
          "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
      }}
    >
      {tableData && (
        <>
          <Table
            dataSource={tableData}
            columns={columns}
            scroll={{ x: 1000 }}
            size="middle"
            pagination={{
              onChange: (page, limit) => {
                setInvoiceFilter({...invoiceFilter, page, limit})
              },
              showSizeChanger: true,
              pageSize: invoiceFilter.limit,
              pageSizeOptions: ["10", "20", "50", "100"],
              total: totalInvoices,
              showTotal: (_, range) =>
                `${range[0]}-${range[1]} of ${totalInvoices} items`,
            }}
          />
        </>
      )}
    </Card>
  );
};

export { InvoicesTable };
