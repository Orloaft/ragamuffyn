import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getDataById } from "../data";
import React from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing characterId param");
  console.log(params);
  const data = await getDataById(params.dataId);
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ data, model: params.modelType, id: params.dataId });
};

export default function Index() {
  const { data, model, id } = useLoaderData<typeof loader>();
  let dataObj = JSON.parse(data.data as string);
  console.log(dataObj);
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div
        className="rpgui-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span> {dataObj.name}</span>

        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
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
          <button type="submit" className="rpgui-button">
            Delete
          </button>
          <NavLink to={`/${model}/${id}/edit`} style={{ marginLeft: "5rem" }}>
            edit
          </NavLink>
        </Form>
      </div>
    </div>
  );
}
