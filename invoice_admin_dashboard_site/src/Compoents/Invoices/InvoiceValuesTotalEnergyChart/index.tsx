import { Card, Tooltip } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";

interface IProps {
  electricEnergyValue: number;
  energySceeValue: number;
  energyCompensatedValue: number;
  contribLlumPublicMunicipalVal: number;
}
const InvoiceValuesTotalEnergyChart = ({
  electricEnergyValue,
  energySceeValue,
  energyCompensatedValue,
  contribLlumPublicMunicipalVal,
}: IProps) => {
  const data = [
    { name: "Eletric Energy", value: electricEnergyValue },
    { name: "Energy SCEE", value: energySceeValue },
    { name: "Energy Compensated", value: energyCompensatedValue },
    { name: "Contrib", value: contribLlumPublicMunicipalVal },
  ];
  return (
    <Card>
 
 <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#000740" />
      </BarChart>
    </ResponsiveContainer>
    </Card>
  );
};

export default InvoiceValuesTotalEnergyChart;
