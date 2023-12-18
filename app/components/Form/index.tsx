import React from "react";
import LevelInput from "../inputs/LevelInput";
import RaceInput from "../inputs/RaceInput";
import ClassInput from "../inputs/ClassInput";
const keyToInput = (key: any, value: any) => {
  switch (key) {
    case "level":
      return <LevelInput value={value} />;
      break;
    case "race":
      return <RaceInput value={value} />;
      break;
    case "class":
      return <ClassInput value={value} />;
      break;
  }
};
const getFields = (data: any) => {
  let keyArray = Object.keys(data);
  return keyArray.map((k: any) => {
    return keyToInput(k, data[k]);
  });
};
const UpdateForm: React.FC<any> = (props) => {
  return getFields(props.data);
};

export default UpdateForm;
