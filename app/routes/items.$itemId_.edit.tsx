import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getItem, updateItem } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.itemId, "Missing itemId param");
  const item = await getItem(parseInt(params.itemId, 10));
  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ item });
};

export default function EditContact() {
  const { item } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <Form id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={item.name}
          aria-label="name"
          name="name"
          type="text"
          placeholder="name"
        />
        <input
          aria-label="description"
          defaultValue={item.description}
          name="description"
          placeholder="description"
          type="text"
        />
      </p>

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
    </Form>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.itemId, "Missing itemId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateItem(parseInt(params.itemId, 10), updates);
  return redirect(`/items/${params.itemId}`);
};
