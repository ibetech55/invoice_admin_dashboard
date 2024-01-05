import { Card, Typography } from 'antd'

interface IProps {
  title: string;
  value: number;
}
const TotalInvoicesCard = ({title, value}: IProps) => {
  return (
    <Card style={{ height: 200, boxShadow:'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
      <Typography
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: 20, textAlign:'center' }}
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
        <Typography style={{ fontSize: "40px", textAlign: 'center', fontWeight: 'bold' }}>
          {value}
        </Typography>
      </div>
    </Card>
  )
}

export default TotalInvoicesCard
