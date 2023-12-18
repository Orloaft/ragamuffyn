import React from "react";
import LevelInput from "../inputs/LevelInput";
import RaceInput from "../inputs/RaceInput";
import ClassInput from "../inputs/ClassInput";
import ItemsInput from "../inputs/ItemsInput";

const UpdateForm: React.FC<any> = (props) => {
  const keyToInput = (key: any, value: any, id: string) => {
    switch (key) {
      case "level":
        return (
          <LevelInput key={key} onChange={props.handleChange} value={value} />
        );
        break;
      case "race":
        return (
          <RaceInput key={key} onChange={props.handleChange} value={value} />
        );
        break;
      case "class":
        return (
          <ClassInput key={key} onChange={props.handleChange} value={value} />
        );
        break;
      case "items":
        return (
          <ItemsInput
            key={key}
            onChange={props.handleChange}
            value={value}
            modelId={id}
          />
        );
        break;
    }
  };
  const getFields = (data: any) => {
    let keyArray = Object.keys(data);
    return keyArray.map((k: any) => {
      return keyToInput(k, data[k], props.modelId);
    });
  };
  return getFields(props.data);
};

export default UpdateForm;
