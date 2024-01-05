import { Card } from 'antd'
import UploadInvoiceInput from '../../Compoents/UploadInvoice/UploadInvoiceInput'
import useInvoice from '../../Hooks/Invoice'

const UploadInvoice = () => {
    const {uploadInvoice} = useInvoice()
  return (
    <Card>
      <h1>Upload Invoice</h1>
      <UploadInvoiceInput uploadInvoice={uploadInvoice} />
    </Card>
  )
}

export default UploadInvoice
