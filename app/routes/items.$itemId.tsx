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
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div className="rpgui-container">
        {item.name} {item.description}
        <div className={`rpgui-icon ` + item.icon}></div>
        <Form
          action="destroy"
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
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
        </Form>
        <NavLink to={`/items/${item.id}/edit`} style={{ marginLeft: "5rem" }}>
          edit
        </NavLink>
      </div>
    </div>
  );
}