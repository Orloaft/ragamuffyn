import { useFetcher } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import type { DataEntry } from "~/data";

import pkg from "lodash";
const { isEqual } = pkg;
export default function useDataLookUp(ids: string[]) {
  const fetcher = useFetcher<DataEntry>();
  const [loading, setLoading] = useState(false);
  const prevIdsRef = useRef(ids);

  // Only update if ids array has actually changed
  useEffect(() => {
    if (!isEqual(prevIdsRef.current, ids)) {
      prevIdsRef.current = ids;

      if (ids.length > 0) {
        setLoading(true);
        fetcher.submit(
          { ids: ids },
          {
            method: "post",
            action: "/api/getByIds",
            encType: "application/json",
          }
        );
      }
    }
  }, [ids, fetcher]);

  // Handle loading state
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setLoading(true);
    } else if (fetcher.state === "idle") {
      setLoading(false);
    }
  }, [fetcher.state]);

  return {
    data: fetcher.data,
    loading,
  };
}
