import React, { useState, useEffect } from "react";
import { ImageListComponent } from "./images/ImageList";

import { useFetcher } from "@remix-run/react";
import { UnorderedList, ListItem } from "@chakra-ui/react";

// Define TypeScript interfaces for clarity

// Assuming the data prop is an array of DataElement
const ListByIds: React.FC<any> = ({ ids, fetchKey }) => {
  const fetcher = useFetcher<any>({ key: fetchKey });

  useEffect(() => {
    fetcher.submit(
      { ids: ids },
      { method: "post", action: "/api/getByIds", encType: "application/json" }
    );
  }, [ids]);

  if (fetcher.state === "loading") return <p>Loading...</p>;
  if (fetcher.data && fetcher.data.error)
    return <p>Error: {fetcher.data.error}</p>;
  console.log("fetcher data", fetcher.data);
  return fetcher.data ? (
    <UnorderedList listStyleType={"none"}>
      {fetcher.data.map((c) => {
        return <ListItem key={c.id}>{c.name}</ListItem>;
      })}
    </UnorderedList>
  ) : (
    ""
  );
};

export default ListByIds;
