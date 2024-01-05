import { Col, Row } from "antd";
import ClientsTable from "../../Compoents/Clients/ClientTable";
import useClient from "../../Hooks/Client";

const Clients = () => {
  const {clientsData, totalClients, handleGetClients} = useClient()
  return (
    <Row gutter={[16, 16]}>
      <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
        <ClientsTable data={clientsData} total={totalClients} handleGetClients={handleGetClients} />
      </Col>
    </Row>
  );
};

export default Clients;
