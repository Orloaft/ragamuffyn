import React, { useState } from "react";
import LevelInput from "../inputs/LevelInput";
import RaceInput from "../inputs/RaceInput";
import ClassInput from "../inputs/ClassInput";
import ItemsInput from "../inputs/ItemsInput";
import { Form, useNavigate } from "@remix-run/react";
import PlayersInput from "../inputs/PlayersInput";
import CharactersInput from "../inputs/CharactersInput";
import EncountersInput from "../inputs/EncountersInput";
import LocationsInput from "../inputs/LocationsInput";

interface FormDataByModel<T> {
  data: T;
}

const UpdateForm = <T extends { [key: string]: any; items?: string[] }>({
  data,
}: FormDataByModel<T>) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<T>(data);
  console.log(formFields);
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields((prevFields: T) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    for (const field in formFields) {
      if (formFields.hasOwnProperty(field)) {
        if (Array.isArray(formFields[field])) {
          formFields[field].forEach((item: any) =>
            formData.append(field, item)
          );
        } else {
          formData.append(field, formFields[field]);
          console.log("appending:", field);
        }
        // This check is to ensure you don't include inherited properties
      }
    }

    try {
      const response = await fetch(event.currentTarget.action, {
        method: "POST",
        body: formData,
        // Note: When submitting FormData, the 'Content-Type' should not be set manually
        // as the browser will set it along with the correct boundary
      });

      if (response.ok) {
        navigate(-1);
        // Handle successful submission here, like redirecting to a thank you page
      } else {
        console.error("Form submission failed");
        // Handle errors here
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      // Handle network errors here
    }
  };
  const keyToInput = (key: any, value: any) => {
    switch (key) {
      case "name":
        return (
          <div>
            <label>
              Name:
              <input
                defaultValue={value}
                aria-label="name"
                name="name"
                type="text"
                placeholder="name"
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "level":
        return <LevelInput onChange={handleChange} value={value} />;
        break;
      case "race":
        return <RaceInput onChange={handleChange} value={value} />;
        break;
      case "class":
        return <ClassInput onChange={handleChange} value={value} />;
        break;
      case "items":
        return <ItemsInput onChange={handleChange} value={value} />;
        break;
      case "plot":
        return (
          <div>
            <label>
              Plot:
              <input
                defaultValue={value}
                aria-label="plot"
                name="plot"
                type="text"
                placeholder="plot"
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "players":
        return <PlayersInput onChange={handleChange} value={value} />;
        break;
      case "characters":
        return <CharactersInput onChange={handleChange} value={value} />;
        break;
      case "encounters":
        return <EncountersInput onChange={handleChange} value={value} />;
        break;
      case "locations":
        return <LocationsInput onChange={handleChange} value={value} />;
        break;
    }
  };
  const getFields = (dataObj: T) => {
    let keyArray = Object.keys(dataObj);
    return keyArray.map((k: string) => {
      return <li key={k}>{keyToInput(k, dataObj[k])}</li>;
    });
  };
  return (
    <Form
      id="contact-form"
      onSubmit={(e) => handleSubmit(e as any)}
      method="post"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 15% 0 15%",
      }}
    >
      <ul>{getFields(formFields)}</ul>
      <button type="submit">Save</button>
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
      >
        Cancel
      </button>
    </Form>
  );
};

export default UpdateForm;
