import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

import DataEntryView from "./DataEntryView";

export default function IdToEntry({ model, id, isList }) {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load(`/collections/${model}/${id}`);
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading {model}...</div>; // Show loading state
  } else if (fetcher.data) {
    let modelData = fetcher.data.data;

    if (modelData) {
      if (isList) {
        return <span>{modelData.name || "no name"}</span>;
      } else {
        return (
          <DataEntryView
            data={JSON.parse(modelData.data)}
            type={model}
            useStore={false}
          />
        );
      }
    } else {
      return <p>record deleted</p>;
    }
  }
}
