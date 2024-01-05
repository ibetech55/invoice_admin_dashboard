import { Card } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GetTotalValueDueReferenceMonthDto } from "../../../Data/InvoiceDtos/GetTotalValueDueReferenceMonthDto";
import { useEffect, useState } from "react";
import { formatMonthYear } from "../../../Utils/FormatMonthYear";
import { formatCurrency } from "../../../Utils/FormatCurrency";

interface IProps {
  data: GetTotalValueDueReferenceMonthDto[];
}

const TotalValuesDueRefMonthChart = ({ data }: IProps) => {
  const [graphData, setGraphData] = useState<
    { name: string; totalValueDue: number }[]
  >([]);
  useEffect(() => {
    const arr = data.map((x: GetTotalValueDueReferenceMonthDto) => ({
      name: formatMonthYear(x.referenceMonth),
      totalValueDue: x.totalValueDueReferenceMonth,
    }));
    setGraphData(arr);
  }, [data]);
  return (
    <Card
      style={{
        boxShadow:
          "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          style={{ overflowY: "hidden" }}
          data={graphData}
          margin={{ top: 10, right: 30, left: -35, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000740" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#000740" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" label="Months" height={75} style={{color:'red'}} />
          <YAxis label="(R$)" width={100} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => [
              formatCurrency(Number(value)),
              "Total Value Due",
            ]}
          />
          <Area
            type="monotone"
            dataKey="totalValueDue"
            stroke="#000740"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TotalValuesDueRefMonthChart;
