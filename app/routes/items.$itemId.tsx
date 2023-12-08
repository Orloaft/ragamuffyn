import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getItem } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.itemId, "Missing itemId param");
  const item = await getItem(parseInt(params.itemId, 10));
  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ item });
};

export default function Index() {
  const { item } = useLoaderData<typeof loader>();
  return (
    <>
      {item.name} {item.description}
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
      </Form>
      <NavLink to={`/items/${item.id}/edit`}>edit</NavLink>
    </>
  );
}
