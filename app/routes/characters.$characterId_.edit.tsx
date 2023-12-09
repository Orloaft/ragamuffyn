import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCharacter, updateCharacter } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const character = await getCharacter(parseInt(params.characterId, 10));
  if (!character) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ character });
};

export default function EditContact() {
  const { character } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <Form
      id="contact-form"
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
        />
        <input
          aria-label="level"
          defaultValue={character.level}
          name="level"
          placeholder="level"
          type="number"
        />
        <input
          aria-label="class"
          defaultValue={character.class}
          name="class"
          placeholder="class"
          type="text"
        />
        <input
          aria-label="race"
          defaultValue={character.race}
          name="race"
          placeholder="race"
          type="text"
        />
        <p>
          <button type="submit">Save</button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
          >
            Cancel
          </button>
        </p>
      </div>
    </Form>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateCharacter(parseInt(params.characterId, 10), updates);
  return redirect(`/characters/${params.characterId}`);
};
