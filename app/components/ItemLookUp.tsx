import React, { useEffect } from "react";
import { useFetcher } from "@remix-run/react";

const ItemLookUp = ({
  addedItems,
  addToForm,
}: {
  addedItems: any[];
  addToForm: any;
}) => {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load("/collections/items");
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading items...</div>; // Show loading state
  } else if (fetcher.data) {
    let { items } = fetcher.data;

    return (
      <div>
        <ul>
          {items.map((item: any) => {
            if (addedItems && addedItems.find((i: any) => i === item.id)) {
              return null;
            } else {
              return (
                <li key={item.id}>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();

                      addToForm({
                        target: {
                          name: "items",
                          value: [...addedItems, item.id],
                        },
                      });
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
