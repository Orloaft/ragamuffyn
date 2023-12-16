import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getItem, updateItem } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.itemId, "Missing itemId param");
  const item = await getItem(params.itemId);
  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ item });
};

export default function EditContact() {
  const { item } = useLoaderData<typeof loader>();
  console.log(item);
  let itemData = JSON.parse(item.data as string);
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
          defaultValue={item.name}
          aria-label="name"
          name="name"
          type="text"
          placeholder="name"
        />
        <span>Description</span>
        <input
          aria-label="description"
          defaultValue={itemData ? itemData.description : ""}
          name="description"
          placeholder="description"
          type="text"
        />

        <select name="icon" id="iconSelect">
          <option value="sword" className="sword">
            Sword
          </option>
          <option value="shield-slot">Shield</option>
          <option value="exclamation">Exclamation</option>
          <option value="potion-red">Red Potion</option>
          <option value="potion-green">Green Potion</option>
          <option value="potion-blue">Blue Potion</option>
        </select>
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
  invariant(params.itemId, "Missing itemId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateItem(params.itemId, updates);
  return redirect(`/items/${params.itemId}`);
};
