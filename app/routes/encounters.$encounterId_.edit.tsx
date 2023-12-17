import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getEncounter, updateEncounter } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.encounterId, "Missing encounterId param");
  const encounter = await getEncounter(params.encounterId);
  if (!encounter) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ encounter });
};

export default function EditContact() {
  const { encounter } = useLoaderData<typeof loader>();
  let encounterData = JSON.parse(encounter.data as string);
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
          defaultValue={encounter.name}
          aria-label="name"
          name="name"
          type="text"
          placeholder="name"
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
  invariant(params.encounterId, "Missing encounterId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateEncounter(params.encounterId, updates);
  return redirect(`/encounters/${params.encounterId}`);
};
