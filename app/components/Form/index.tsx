import React, { useEffect, useState } from "react";
import LevelInput from "../inputs/LevelInput";
import ClassInput from "../inputs/ClassInput";
import { Form, useNavigate } from "@remix-run/react";
import DataEntryInput from "../inputs/DataEntryInput";
import PlayersInput from "../inputs/PlayersInput";
import {
  Button,
  Center,
  Flex,
  Input,
  ListItem,
  Textarea,
  UnorderedList,
} from "@chakra-ui/react";
import ImageUpload from "../images/ImageUpload";

interface FormDataByModel<T> {
  data: T;
}

const UpdateForm = <T extends { [key: string]: any; items?: string[] }>({
  data,
}: FormDataByModel<T>) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState<T>(data);
  useEffect(() => {
    setFormFields(data);
  }, [data]);
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
          formFields[field].forEach((item: any) => {
            console.log("appending:", field, item);
            formData.append(field, item);
          });
        } else {
          formData.append(field, formFields[field]);
        }
        // This check is to ensure you don't include inherited properties
      }
    }

    try {
      console.log("formdata", formData);
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
              Name
              <Input
                color="black"
                borderRadius=".25rem"
                border="1px grey solid"
                backgroundColor="#dddddd"
                value={value}
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
      case "text":
        return (
          <div>
            <label>
              Text
              <Textarea
                color="black"
                backgroundColor="#dddddd"
                defaultValue={value}
                aria-label="text"
                name="text"
                placeholder="text"
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case "race":
        return (
          <div>
            <label>
              Race
              <Input
                color="black"
                borderRadius=".25rem"
                border="1px grey solid"
                backgroundColor="#dddddd"
                defaultValue={value}
                aria-label="race"
                name="race"
                type="text"
                placeholder="race"
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;
      case "images":
        return <ImageUpload handleChange={handleChange} images={value} />;

      case "description":
        return (
          <div>
            <label>
              description
              <Textarea
                color="black"
                backgroundColor="#dddddd"
                defaultValue={value}
                aria-label="description"
                name="description"
                placeholder="description"
                onChange={handleChange}
              />
            </label>
          </div>
        );
        break;

      case "class":
        return <ClassInput onChange={handleChange} value={value} />;
      case "players":
        return <PlayersInput onChange={handleChange} value={value} />;
      case "round":
        return;
        break;
      case "bio":
        return (
          <div>
            <label>
              Bio
              <Textarea
                color="black"
                backgroundColor="#dddddd"
                defaultValue={value}
                aria-label="bio"
                name="bio"
                placeholder="bio"
                onChange={handleChange}
              />
            </label>
          </div>
        );

        break;
      case "type":
        return;
        break;
      case "initiativeOrder":
        return;
        break;
      case "characterSheet":
        return;
        break;
      case "currentTurn":
        return;
        break;

      case "plot":
        return (
          <div>
            <label>
              Plot
              <Textarea
                color="black"
                backgroundColor="#dddddd"
                defaultValue={value}
                aria-label="plot"
                name="plot"
                placeholder="plot"
                onChange={handleChange}
              />
            </label>
          </div>
        );
    }
    return <DataEntryInput onChange={handleChange} value={value} model={key} />;
  };
  const getFields = (dataObj: T) => {
    let keyArray = Object.keys(dataObj);
    return keyArray.map((k: string) => {
      return <ListItem key={k}>{keyToInput(k, dataObj[k])}</ListItem>;
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
      <UnorderedList
        width="100%"
        style={{ listStyle: "none", padding: "10px" }}
        color="#dddddd"
      >
        {formFields && getFields(formFields)}
      </UnorderedList>
      <Center>
        {" "}
        <Flex>
          <Button type="submit">Save</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            type="button"
          >
            Cancel
          </Button>
        </Flex>
      </Center>
    </Form>
  );
};

export default UpdateForm;
