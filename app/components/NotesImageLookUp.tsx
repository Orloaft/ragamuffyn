import React, { useState, useEffect } from "react";
import { ImageListComponent } from "./images/ImageList";

import { useFetcher } from "@remix-run/react";

// Define TypeScript interfaces for clarity

// Assuming the data prop is an array of DataElement
const NotesImageLookUp: React.FC<any> = ({ noteIds, onChange }) => {
  const fetcher = useFetcher<any>({ key: "noteById" });
  console.log("noteids", noteIds);
  useEffect(() => {
    fetcher.submit(
      { ids: noteIds },
      { method: "post", action: "/api/getByIds", encType: "application/json" }
    );
  }, [noteIds]);

  if (fetcher.state === "loading") return <p>Loading...</p>;
  if (fetcher.data && fetcher.data.error)
    return <p>Error: {fetcher.data.error}</p>;
  console.log("fetcher data", fetcher.data);
  return fetcher.data ? (
    <ImageListComponent
      images={fetcher.data.map((d) => JSON.parse(d.data).images)}
      setCellImage={onChange}
      onChange={() => {}}
    />
  ) : (
    ""
  );
};

export default NotesImageLookUp;
