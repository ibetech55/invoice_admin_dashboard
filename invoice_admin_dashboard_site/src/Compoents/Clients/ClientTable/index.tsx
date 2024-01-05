import { Card, Table, Typography } from "antd";
import { GetClientsDataDto } from "../../../Data/ClientDtos/GetClientsDto";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface IProps {
  data: GetClientsDataDto[];
  total: number;
  handleGetClients: () => void;
}

interface DataType {
  key: React.Key;
  name: string;
  clientNumber: string;
  city: string;
  state: string;
  type: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 140,
    render: (val: string, row:DataType) => <Link to={`/client/${row.key}`}>{val}</Link>,
  },
  {
    title: "Client Number",
    dataIndex: "clientNumber",
    key: "clientNumber",
    width: 140,
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
    width: 140,
  },
];

const ClientsTable = ({ data, total, handleGetClients }: IProps) => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  useEffect(()=>{
    handleGetClients()
  }, [handleGetClients])
  useEffect(() => {
    if (data) {
      setTableData(
        data.map((x: GetClientsDataDto) => ({
          key: x.id,
          name: x.name,
          clientNumber: x.clientNumber,
          city: x.city,
          state: x.state,
          type: x.type
        }))
      );
    }
  }, [data]);
  return (
    <Card>
      <Table
        dataSource={tableData}
        columns={columns}
        scroll={{ x: 1000 }}
        size="middle"
      />
      <Typography>{total}</Typography>
    </Card>
  );
};

export default ClientsTable;
