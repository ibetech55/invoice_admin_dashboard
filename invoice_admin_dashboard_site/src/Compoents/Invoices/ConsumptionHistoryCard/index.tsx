import { Card } from "antd";
import { ConsumptionHistoryDto } from "../../../Data/InvoiceDtos/ConsumtionHistoryDto";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { formatMonthYear } from "../../../Utils/FormatMonthYear";

interface IProps {
  data: ConsumptionHistoryDto[];
}

interface DataType {
  key: React.Key;
  id: number;
  monthYear: string;
  consumptionKwh: number;
  measurementKwhPerDay: number;
  days: number;
  index: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Month/Year",
    dataIndex: "monthYear",
    key: "monthYear",
    width: 140,
    render: (val: string) => formatMonthYear(val),
  },
  {
    title: "Consumption kwh",
    dataIndex: "consumptionKwh",
    key: "consumptionKwh",
    width: 140,
  },
  {
    title: "Measurement kwh per day",
    dataIndex: "measurementKwhPerDay",
    key: "measurementKwhPerDay",
    width: 140,
  },
  {
    title: "Days",
    dataIndex: "days",
    key: "days",
    width: 140,
  }
];


const ConsumptionHistoryCard = ({ data }: IProps) => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  useEffect(() => {
    if (data) {
      const arr: DataType[] = data.map((x: ConsumptionHistoryDto) => ({
        key: Number(x.id),
        monthYear: x.monthYear,
        consumptionKwh: x.consumptionKwh,
        measurementKwhPerDay: x.measurementKwhPerDay,
        days: x.days,
        id:x.id,
        index: x.index
      }));
      setTableData(arr);
    }
  }, [data]);

  return (
    <Card>
      <h3>Consumption History</h3>
      {tableData && (
        <>
          <Table
            dataSource={tableData}
            columns={columns}
            scroll={{ x: 1000 }}
            size="middle"
            pagination={false}
          />
        </>
      )}
    </Card>
  );
};

export default ConsumptionHistoryCard;
