import React, { useState } from "react";
import ItemLookUp from "../ItemLookUp";

const ItemsInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Items:
        <ul>
          {props.value.map((item: any) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <ItemLookUp
          addToForm={props.onChange}
          addedItems={props.value}
          modelId={props.modelId}
        />
      </label>
    </div>
  );
};

export default ItemsInput;
