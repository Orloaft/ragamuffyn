import { Box, Flex, Select } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useFetcher } from "@remix-run/react";

import { EncounterElementsModal } from "./EncounterElementModal";

export default function EncounterElementsLookUp({ addedData, addToForm }) {
  const [model, setModel] = useState("encounters");
  const fetcher = useFetcher<any>();

  useEffect(() => {
    fetcher.load(`/collections/${model}`);
  }, [model]);
  if (fetcher.state === "loading") {
    return <div>Loading {model}...</div>; // Show loading state
  } else if (fetcher.data) {
    return (
      <>
        <Box color="#dddddd">
          <Flex>
            <Select
              onChange={(e) => {
                setModel(e.target.value);
              }}
              value={model}
            >
              <option value="encounters">Encounters</option>
              <option value="npcs">NPCs</option>
              <option value="characters">Characters</option>
              <option value="notes">Notes</option>
            </Select>{" "}
            <div>
              {fetcher.data.data && (
                <EncounterElementsModal
                  model={model}
                  data={fetcher.data.data}
                  button={<AddIcon />}
                  addedData={addedData}
                  addToForm={addToForm}
                />
              )}
            </div>
          </Flex>
        </Box>
      </>
    );
  }
}
