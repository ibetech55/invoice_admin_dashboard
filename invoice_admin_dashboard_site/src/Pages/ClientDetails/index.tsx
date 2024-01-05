import { Card, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import useClient from "../../Hooks/Client";
import { useEffect } from "react";
import ClientDetailsCard from "../../Compoents/Clients/ClientDetailsCard";

const ClientDetails = () => {
  const { id } = useParams();
  const { handleGetClient, clientData } = useClient();

  useEffect(() => {
    if (id) {
      handleGetClient(id);
    }
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card>
          <h1>Invoice Details: {clientData.name}</h1>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <ClientDetailsCard
          name={clientData.name}
          clientNumber={clientData.clientNumber}
          streetAddress={clientData.streetAddress}
          zipCode={clientData.zipCode}
          city={clientData.city}
          state={clientData.state}
          type={clientData.type}
          taxIdentifier={clientData.taxIdentifier}
          stateInscription={clientData.stateInscription}
          createdAt={clientData.createdAt}
        />
      </Col>
    </Row>
  );
};

export default ClientDetails;
