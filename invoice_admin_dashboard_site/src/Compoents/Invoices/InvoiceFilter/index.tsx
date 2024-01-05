import { Button, Card, Col, Collapse, DatePicker, Input, Row } from "antd";
import { InvoiceFilterDto } from "../../../Data/InvoiceDtos/InvoiceFilterDto";
import dayjs from "dayjs";
import useDebouncedState from "../../../Hooks/UseDebounce";
const { Search } = Input;
const { RangePicker } = DatePicker;

interface IProps {
  handleInvoiceSearch: () => void;
  setInvoiceFilter: (invoiceFilter: InvoiceFilterDto) => void;
  reset:()=>void;
}
const InvoiceFilter = ({ handleInvoiceSearch, setInvoiceFilter, reset }: IProps) => {
  const [filter, setFilter] = useDebouncedState<InvoiceFilterDto>({}, setInvoiceFilter);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInvoiceSearch();
  };

  return (
    <Card>
      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: "Invoice Filters",
            children: (
              <form onSubmit={handleSubmit}>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={8}
                  >
                    <Search
                      placeholder="Invoice Number"
                      allowClear
                      name="invoiceNumber"
                      value={filter.invoiceNumber}
                      onChange={handleOnChange}
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={8}
                  >
                    <DatePicker
                      picker="month"
                      bordered
                      style={{ width: "100%" }}
                      format="MMM/YYYY"
                      placeholder="Reference Month"
                      name="referenceMonthDate"
                      value={filter.referenceMonthDate}
                      onChange={(referenceMonthDate, referenceMonth) =>
                        setFilter({
                          ...filter,
                          referenceMonth,
                          referenceMonthDate,
                        })
                      }
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                  >
                    <Input
                      placeholder="Min Value Due"
                      allowClear
                      value={filter.minValueDue}
                      name="minValueDue"
                      onChange={handleOnChange}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                  >
                    <Input
                      placeholder="Max Value Due"
                      allowClear
                      name="maxValueDue"
                      value={filter.maxValueDue}
                      onChange={handleOnChange}
                    />
                  </Col>

                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                  >
                    <Input
                      placeholder="Min Consumption kwh"
                      allowClear
                      name="minConsumptionKwh"
                      value={filter.minConsumptionKwh}
                      onChange={handleOnChange}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                  >
                    <Input
                      placeholder="Max Consumption kwh"
                      allowClear
                      name="maxConsumptionKwh"
                      onChange={handleOnChange}
                      value={filter.maxConsumptionKwh}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <RangePicker
                    placeholder={['Expiration Date Start', 'Expiration Date End']}
                      style={{ width: "100%" }}
                      format="MM-DD-YYYY"
                      value={filter.expirationDateData}
                      onChange={(expirationDateData, dateValues) => {
                        setFilter({
                          ...filter,
                          expirationDateData:expirationDateData as [dayjs.Dayjs, dayjs.Dayjs],
                          expirationDateStart: dateValues[0],
                          expirationDateEnd: dateValues[1],
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    setFilter({})
                    reset()
                  }}
                >
                  Reset
                </Button>
              </form>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default InvoiceFilter;
