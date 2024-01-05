import { createBrowserRouter } from "react-router-dom";
import Template from "../Compoents/Template";
import Dashboard from "../Pages/Dashboard";
import InvoiceDetails from "../Pages/InvoiceDetails";
import UploadInvoice from "../Pages/UploadInvoice";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/clients",
          element: <div>Clients</div>,
        },
        {
          path: "/:id",
          element: <InvoiceDetails />,
        },
        {
          path: "/upload_invoice",
          element: <UploadInvoice />,
        },
      ],
    },
  ]);

  export default router;