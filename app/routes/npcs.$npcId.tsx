import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getNpc } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.npcId, "Missing npcId param");
  const npc = await getNpc(parseInt(params.npcId, 10));
  if (!npc) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ npc });
};

export default function Index() {
  const { npc } = useLoaderData<typeof loader>();
  return (
    <>
      {npc.name} {npc.bio}
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
        <NavLink to={`/npcs/${npc.id}/edit`}>edit</NavLink>
      </Form>
    </>
  );
}
