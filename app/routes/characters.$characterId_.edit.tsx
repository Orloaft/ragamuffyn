import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCharacter, updateCharacter } from "../data";
import UpdateForm from "~/components/Form";
import { useState } from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const character = await getCharacter(params.characterId);
  if (!character) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ character });
};

export default function EditContact() {
  const { character } = useLoaderData<typeof loader>();
  let characterData = JSON.parse(character.data as string);
  const [formFields, setFormFields] = useState<any>(characterData);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormFields((prevFields: any) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: HTMLFormElement) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log("formData:", formData, "fields:", formFields);
    for (const field in formFields) {
      if (formFields.hasOwnProperty(field)) {
        if (Array.isArray(formFields[field])) {
          formFields[field].forEach((item: any) =>
            formData.append("items", item)
          );
        } else {
          formData.append(field, formFields[field]);
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
        console.log("Form submitted successfully");
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
  const navigate = useNavigate();
  return (
    <Form
      id="contact-form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      method="post"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Name</span>
        <input
          defaultValue={character.name}
          aria-label="name"
          name="name"
          type="text"
          placeholder="name"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <UpdateForm
          data={formFields}
          modelId={character.id}
          handleChange={handleChange}
        />
        <button type="submit">Save</button>
        <button
          onClick={() => {
            navigate(-1);
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const formData = await request.formData();

  const formDataToObj = (formData) => {
    const obj = {};

    // Iterate over all keys in the FormData
    for (const key of formData.keys()) {
      const values = formData.getAll(key);

      // Check if there are multiple non-duplicate values for this key
      const uniqueValues = [...new Set(values)];
      if (uniqueValues.length > 1) {
        // Store as an array if there are multiple unique values
        obj[key] = uniqueValues;
      } else {
        // Store as a single value if there's only one unique value
        obj[key] = uniqueValues[0];
      }
    }

    return obj;
  };

  const updates = formDataToObj(formData);
  console.log("updates:", updates);
  await updateCharacter(params.characterId, updates);
  return redirect(`/characters/${params.characterId}`);
};
