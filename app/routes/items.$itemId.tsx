import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { addToDataModel, getItem } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.itemId, "Missing itemId param");
  const item = await getItem(params.itemId);
  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ item });
};

export default function Index() {
  const { item } = useLoaderData<typeof loader>();
  let itemData = JSON.parse(item.data as string);
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div className="rpgui-container">
        {item.name}{" "}
        {itemData && (
          <>
            <span>{itemData.description}</span>
            <div className={`rpgui-icon ` + itemData.icon}></div>
          </>
        )}
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

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // Parse the form data from the request
  try {
    // Collect stream data
    let body = "";
    if (request.body) {
      const reader = request.body.getReader();
      let done, value;
      while (!done) {
        ({ done, value } = await reader.read());
        body += new TextDecoder().decode(value);
      }
    }

    // Parse the string as JSON
    const data = JSON.parse(body);
    if (params.itemId) {
      addToDataModel(params.itemId, data.modelId);
    }

    // Handle your business logic here

    return json({ message: "Data processed successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Error processing data" });
  }
};
