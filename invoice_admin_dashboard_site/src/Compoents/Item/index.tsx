import {
  CopyOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Typography, Tooltip, Col, Input, Skeleton } from "antd";
import { useState } from "react";
import { copyToClipboard } from "../../Utils/CopyToClipboard";

interface IProps {
  title: string;
  data: string | number;
  copyIcon?: boolean;
  cols?: { xs: number; sm: number; md: number; lg: number; xl: number };
  hideText?: boolean;
  loading?: boolean;
}
const Item = ({ title, data, copyIcon, cols, hideText, loading }: IProps) => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const colValues = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 4,
    xl: 4,
  };
  return (
    <Col className="gutter-row" {...(!cols ? colValues : cols)}>
      {!loading ? (
        <>
          <Typography style={{ fontWeight: "bold" }}>{title}</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography style={{ textAlign: "left", marginRight: 10 }}>
              <Tooltip
                trigger="click"
                title="Text Copied"
                destroyTooltipOnHide={true}
                open={open}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {copyIcon && (
                    <CopyOutlined
                      style={{ fontSize: 20, cursor: "pointer" }}
                      onClick={() => {
                        setOpen(true);
                        copyToClipboard(data);

                        setTimeout(() => {
                          setOpen(false);
                        }, 1000);
                      }}
                    />
                  )}

                  {!hideText ? (
                    <span>{data}</span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <Input
                        type={hide ? "password" : "text"}
                        value={data}
                        style={{
                          width: 350,
                          paddingLeft: 5,
                          border: "none",
                          color: "black",
                          background: "#fff",
                        }}
                        disabled
                      />
                      {hide ? (
                        <EyeOutlined
                          onClick={() => setHide(false)}
                          style={{ fontSize: 18 }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={() => setHide(true)}
                          style={{ fontSize: 18 }}
                        />
                      )}
                    </span>
                  )}
                  <></>
                </div>
              </Tooltip>{" "}
            </Typography>
          </div>
        </>
      ) : (
        <>
          <Skeleton active />
        </>
      )}
    </Col>
  );
};

export default Item;
