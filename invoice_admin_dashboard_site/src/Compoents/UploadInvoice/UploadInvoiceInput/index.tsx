import { useState } from "react";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, Typography, Upload } from "antd";

interface IProps {
  uploadInvoice: (val: UploadFile[]) => void;
}
const { Dragger } = Upload;

const UploadInvoiceInput = ({ uploadInvoice }: IProps) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const props: UploadProps = {
    name: "pdfFile",
    customRequest: () => {},
    showUploadList: false,
    multiple: true,
    onChange(info) {
      setFiles([...info.fileList]);
    },
  };

  const handleUpload = async () => {
    uploadInvoice(files);
    setFiles([]);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleDeleteFile = (index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  };

  return (
    <>
      <Dragger {...props} key={refreshKey}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
        <div></div>
      </Dragger>
      <div>
        {files.map((x, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>{x.name}</Typography>
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteFile(i)}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => handleUpload()}>
          Upload Files
        </Button>
      </div>
    </>
  );
};

export default UploadInvoiceInput;
