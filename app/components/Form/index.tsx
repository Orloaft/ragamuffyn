import React, { useEffect, useState } from "react";
import LevelInput from "../inputs/LevelInput";
import ClassInput from "../inputs/ClassInput";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
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
import CharacterForm from "../CharacterSheetForm";

interface FormDataByModel<T> {
  data: T;
}

const UpdateForm = <T extends { [key: string]: any; items?: string[] }>({
  data,
}: FormDataByModel<T>) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
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
    fetcher.submit(
      {
        updates: { ...formFields, id: data.id },
      },
      { method: "post", action: "/api/updateData", encType: "application/json" }
    );
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
      case "id":
        return;
        break;
      case "gridProps":
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
        return (
          <CharacterForm
            characterData={value}
            setCharacterData={(v) =>
              handleChange({ target: { name: "characterSheet", value: v } })
            }
          />
        );
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
