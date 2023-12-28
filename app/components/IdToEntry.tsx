import { NavLink, useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export default function IdToEntry(props: any) {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load(`/collections/${props.model}/${props.id}`);
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading {props.model}...</div>; // Show loading state
  } else if (fetcher.data) {
    let modelData = fetcher.data.data;
    if (modelData) {
      return (
        <NavLink to={`/collections/${props.model}/${props.id}`}>
          <span>{modelData.name}</span>
        </NavLink>
      );
    } else {
      return <p>record deleted</p>;
    }
  }
}
