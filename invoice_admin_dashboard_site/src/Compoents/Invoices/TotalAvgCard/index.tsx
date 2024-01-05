import { Card, Typography } from "antd";
import { handleNumberColor } from "../../../Utils/HandleNumberColor";
import { formatCurrency } from "../../../Utils/FormatCurrency";

interface IProps {
  title: string;
  totalValue: number;
  avgValue: number;
  type?: string;
}

interface INumberComponent {
    value: number;
    type?: string;
  }

const TYPES = {
  CURRENCY: "currency",
};

 const NumberComponent = ({value, type}:INumberComponent) => {
    if (type === TYPES.CURRENCY) {
      return (<span style={{ color: handleNumberColor(value) }}>{formatCurrency(value)}</span>);
    } else {
        return (<span>{value}</span>);
    }
  };

const TotalAvgCard = ({ title, totalValue, avgValue, type }: IProps) => {
 
  return (
    <Card style={{ height: 200, boxShadow:'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
      <Typography
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: 20, textAlign:'center' }}
      >
        {title}
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
        }}
      >
        <Typography style={{ fontSize: "16px" }}>
          Total Value:{" "}
          <NumberComponent value={totalValue} type={type} />
        </Typography>
        <Typography style={{ fontSize: "16px" }}>
          Average Value:{" "}
          <NumberComponent value={avgValue} type={type} />
        </Typography>
      </div>
    </Card>
  );
};

export default TotalAvgCard;
