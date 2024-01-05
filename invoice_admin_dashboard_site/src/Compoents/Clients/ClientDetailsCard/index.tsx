import { Card, Row } from "antd";
import React from "react";
import Item from "../../Item";
import { DateTime } from "luxon";

interface IProps {
  name: string;
  clientNumber: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  state: string;
  type: string;
  taxIdentifier: string;
  stateInscription: string;
  createdAt: Date;
}
const ClientDetailsCard = ({
  name,
  clientNumber,
  streetAddress,
  zipCode,
  city,
  state,
  type,
  taxIdentifier,
  stateInscription,
  createdAt,
}: IProps) => {
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Item
          title="Client"
          data={name}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Client Number"
          data={clientNumber}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Type"
          data={type}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Tax Identifier"
          data={taxIdentifier}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="State Inscription"
          data={stateInscription ? stateInscription : "-"}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="State"
          data={state}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="City"
          data={city}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Street Address"
          data={streetAddress}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Zip Code"
          data={zipCode}
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
        <Item
          title="Date Created"
          data={
            DateTime.fromJSDate(new Date(createdAt), { zone: "utc" }).toFormat(
              "dd/MM/yyyy hh:mm"
            ) as string
          }
          cols={{ xs: 24, sm: 24, md: 12, lg: 6, xl: 6 }}
        />
      </Row>
    </Card>
  );
};

export default ClientDetailsCard;
