import { Card, Row } from "antd";
import Item from "../../Item";
import {
  AccountCorrectionDto,
  AccountFineDto,
  AccountTaxDto,
  EnergyDto,
} from "../../../Data/InvoiceValuesDtos/EnergyDto";
import { formatCurrency } from "../../../Utils/FormatCurrency";
import { formatDate } from "../../../Utils/FormatDate";

interface IProps {
  electricEnergy: EnergyDto;
  energyScee: EnergyDto;
  energyCompensated: EnergyDto;
  contribLlumPublicMunicipalVal: number;
  bonusItaipuVal: number;
  accountFine: AccountFineDto;
  accountTax: AccountTaxDto;
  accountCorrection: AccountCorrectionDto;
}
const InvoiceValuesCard = ({
  electricEnergy,
  energyScee,
  energyCompensated,
  contribLlumPublicMunicipalVal,
  bonusItaipuVal,
  accountFine,
  accountTax,
  accountCorrection,
}: IProps) => {
  return (
    <Card>
      <h3>Invoice Values</h3>
      <Row gutter={[16, 16]}>
        <Item
          title="Eletric Energy Value"
          data={formatCurrency(electricEnergy.value)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Eletric Energy Quantity"
          data={electricEnergy.quantity}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Eletric Energy Unit Price"
          data={formatCurrency(electricEnergy.unitPrice)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Eletric Energy Unit Tax"
          data={formatCurrency(electricEnergy.unitTax)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />

        <Item
          title="Energy Scee Value"
          data={formatCurrency(energyScee.value)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Energy Scee Quantity"
          data={energyScee.quantity}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Energy Scee Unit Price"
          data={formatCurrency(energyScee.unitPrice)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Energy Scee Unit Tax"
          data={formatCurrency(energyScee.unitTax)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />

        <Item
          title="Energy Compensated Value"
          data={formatCurrency(energyCompensated.value)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Energy Compensated Quantity"
          data={energyCompensated.quantity}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Energy Compensated Unit Price"
          data={formatCurrency(energyCompensated.unitPrice)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Energy Compensated Unit Tax"
          data={formatCurrency(energyCompensated.unitTax)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Contrib llum Public Municipal Value"
          data={formatCurrency(contribLlumPublicMunicipalVal)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Bonus Itaipu Value"
          data={formatCurrency(bonusItaipuVal)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Account Fine Month"
          data={accountFine ? formatDate(accountFine.accountMonth) : "-"}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Account Fine Value"
          data={formatCurrency(accountFine ? accountFine.accountValue : 0)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />

        <Item
          title="Account Tax Month"
          data={accountTax ? formatDate(accountTax.accountMonth) : "-"}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Account Tax Value"
          data={formatCurrency(accountTax ? accountTax.accountValue : 0)}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />

        <Item
          title="Account Tax Date Paid"
          data={accountTax ? formatDate(accountTax.accountMonth) : "-"}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />

        <Item
          title="Account Correction Month"
          data={
            accountCorrection ? formatDate(accountCorrection.accountMonth) : "-"
          }
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Account Correction Value"
          data={formatCurrency(
            accountCorrection ? accountCorrection.accountValue : 0
          )}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />

        <Item
          title="Account Correction Date Paid"
          data={
            accountCorrection ? formatDate(accountCorrection.accountMonth) : "-"
          }
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
      </Row>
    </Card>
  );
};

export default InvoiceValuesCard;
