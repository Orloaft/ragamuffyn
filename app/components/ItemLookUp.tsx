import React, { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import axios from "axios";

const ItemLookUp = ({
  modelId,
  addedItems,
  submit,
}: {
  modelId: string;
  addedItems: any[];
  submit: any;
}) => {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load("/items");
  }, []);

  if (fetcher.state === "loading") {
    return <div>Loading items...</div>; // Show loading state
  } else if (fetcher.data) {
    let { items } = fetcher.data;

    return (
      <div>
        <ul>
          {items.map((item: any) => {
            if (addedItems && addedItems.find((i: any) => i.id === item.id)) {
              return null;
            } else {
              return (
                <li key={item.id}>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await axios.post(`/items/${item.id}`, {
                        modelId,
                      });
                      submit();
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              );
            }
          })}{" "}
        </ul>
      </div>
    );
  }
};

export default ItemLookUp;
