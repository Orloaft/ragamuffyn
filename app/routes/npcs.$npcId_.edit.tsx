import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getNpc, updateNpc } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.npcId, "Missing npcId param");
  const npc = await getNpc(parseInt(params.npcId, 10));
  if (!npc) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ npc });
};

export default function EditContact() {
  const { npc } = useLoaderData<typeof loader>();
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
          defaultValue={npc.name}
          aria-label="name"
          name="name"
          type="text"
          placeholder="name"
        />
        <input
          aria-label="bio"
          defaultValue={npc.bio}
          name="bio"
          placeholder="bio"
          type="text"
        />
        <div>
          <button type="submit">Save</button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
          >
            Cancel
          </button>
        </div>{" "}
      </div>
    </Form>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.npcId, "Missing npcId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateNpc(parseInt(params.npcId, 10), updates);
  return redirect(`/npcs/${params.npcId}`);
};
