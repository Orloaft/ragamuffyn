import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCharacter } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const character = await getCharacter(parseInt(params.characterId, 10));
  if (!character) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ character });
};

export default function Index() {
  const { character } = useLoaderData<typeof loader>();
  return (
    <>
      the char: {character.name} {character.level}
      <Form
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
        <button type="submit">Delete</button>
        <NavLink to={`/characters/${character.id}/edit`}>edit</NavLink>
      </Form>
    </>
  );
}
