import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getLocation, updateEncounter, updateLocation } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.locationId, "Missing locationId param");
  const location = await getLocation(params.locationId);
  if (!location) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ location });
};

export default function EditContact() {
  const { location } = useLoaderData<typeof loader>();
  let locationData = JSON.parse(location.data as string);
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
          defaultValue={location.name}
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
  invariant(params.locationId, "Missing locationId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateLocation(params.locationId, updates);
  return redirect(`/locations/${params.locationId}`);
};
