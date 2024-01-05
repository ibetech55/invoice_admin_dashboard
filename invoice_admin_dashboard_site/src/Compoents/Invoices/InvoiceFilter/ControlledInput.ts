/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import _ from "lodash";
import { InvoiceFilterDto } from "../../../Data/InvoiceDtos/InvoiceFilterDto";

export const ControlledInput = (setGlobalState: any) => {
  const [state, setState] = useState({})
  const updateGlobalState = (newState) => {
    // Assuming you have a function to update the global state (e.g., a Redux action)
    setState(newState);
  };

  const debouncedUpdateGlobalState = _.debounce(updateGlobalState, 1000); 






    return {debouncedUpdateGlobalState}
 }

