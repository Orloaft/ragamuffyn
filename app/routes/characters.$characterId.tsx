import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { addToDataModel, getCharacter } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  console.log(params.characterId);
  const character = await getCharacter(params.characterId);
  if (!character) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ character });
};

export default function Index() {
  const { character } = useLoaderData<typeof loader>();
  let characterData = JSON.parse(character.data as string);
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div
        className="rpgui-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span> {character.name}</span>
        {characterData && (
          <>
            {" "}
            <span>{characterData.race}</span>
            <span>{characterData.class}</span>
            <span>{characterData.level}</span>
          </>
        )}
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="rpgui-button">
            Delete
          </button>
          <NavLink
            to={`/characters/${character.id}/edit`}
            style={{ marginLeft: "5rem" }}
          >
            edit
          </NavLink>
        </Form>
      </div>
    </div>
  );
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // Parse the form data from the request
  try {
    // Collect stream data
    let body = "";
    if (request.body) {
      const reader = request.body.getReader();
      let done, value;
      while (!done) {
        ({ done, value } = await reader.read());
        body += new TextDecoder().decode(value);
      }
    }

    // Parse the string as JSON
    const data = JSON.parse(body);
    if (params.characterId) {
      addToDataModel(params.characterId, data.modelId);
    }

    // Handle your business logic here

    return json({ message: "Data processed successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Error processing data" });
  }
};
