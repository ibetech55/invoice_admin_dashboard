import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

interface IProps {
  uploadInvoice: (val: any) => void;
}
const { Dragger } = Upload;

const props: UploadProps = {
  name: "pdfFile",
  customRequest: () => {
    console.log(999);
  },
  multiple: true,
  //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    console.log(info);
    // const { status } = info.file;
    // if (status !== "uploading") {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === "done") {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
};

const UploadInvoiceInput = ({ uploadInvoice }: IProps) => (
  <>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
      <div></div>
    </Dragger>
    <div style={{marginTop:16}}>
    <Button type="primary">Upload Files</Button>

    </div>
  </>
);

export default UploadInvoiceInput;
