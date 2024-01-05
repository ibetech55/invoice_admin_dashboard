import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";

interface IProps {
  uploadInvoice: (val: any) => void;
}
const { Dragger } = Upload;



const UploadInvoiceInput = ({ uploadInvoice }: IProps) => {


const [files, setFiles] = useState<UploadFile[]>([])

const props: UploadProps = {
  name: "pdfFile",
  customRequest: () => {
  },
  showUploadList:{
    showRemoveIcon:true
  },
  multiple: true,
  onChange(info) {
   setFiles([...info.fileList])
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

  return (
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
      <Button type="primary" onClick={()=>uploadInvoice(files)}>Upload Files</Button>
      </div>
    </>
  );
}

export default UploadInvoiceInput;
