import { createBrowserRouter } from "react-router-dom";
import Template from "../Compoents/Template";
import Dashboard from "../Pages/Dashboard";
import InvoiceDetails from "../Pages/InvoiceDetails";
import UploadInvoice from "../Pages/UploadInvoice";
import Clients from "../Pages/Clients";
import ClientDetails from "../Pages/ClientDetails";

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
          element: <Clients />,
        },
        {
          path: "/:id",
          element: <InvoiceDetails />,
        },
        {
          path: "/upload_invoice",
          element: <UploadInvoice />,
        },
        {
          path: "/client/:id",
          element: <ClientDetails />,
        },
      ],
    },
  ]);

  export default router;