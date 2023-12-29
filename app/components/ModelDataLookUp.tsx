import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";

import { ModalPopUp } from "./AddModalPopUp";
const ModelDataLookUp = ({
  addedData,
  addToForm,
  model,
}: {
  addedData: string[];
  addToForm: any;
  model: string;
}) => {
  const fetcher = useFetcher<any>();

  useEffect(() => {
    fetcher.load(`/collections/${model}`);
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading {model}...</div>; // Show loading state
  } else if (fetcher.data) {
    return (
      <div>
        {fetcher.data.data && (
          <ModalPopUp
            button={<AddIcon />}
            addToForm={addToForm}
            data={fetcher.data.data}
            model={model}
            addedData={addedData}
          />
        )}
      </div>
    );
  }
};

export default ModelDataLookUp;
