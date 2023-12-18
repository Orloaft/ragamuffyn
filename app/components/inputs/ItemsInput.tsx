import React, { useState } from "react";
import ItemLookUp from "../ItemLookUp";

const ItemsInput: React.FC<any> = (props) => {
  // State for storing the input value
  const [items, setItems] = useState<any[]>(props.value);
  const submit = (item: any) => {
    setItems([...items, item]);
  };
  return (
    <div>
      <label>
        Items:
        <ul>
          {items.map((item: any) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
        <ItemLookUp
          addedItems={items}
          modelId={props.modelId}
          submit={submit}
        />
      </label>
    </div>
  );
};

export default ItemsInput;
