import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getLocation } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.locationId, "Missing locationId param");
  const location = await getLocation(params.locationId);
  if (!location) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ location, locationId: params.locationId });
};

export default function Index() {
  const { location } = useLoaderData<typeof loader>();

  const data = JSON.parse(location.data as string);

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div className="rpgui-container">
        <span>{location.name}</span>
        {location.data && (
          <>
            <p>{data.plot}</p>
            <ul>
              {data.characters &&
                data.characters.map((c: c) => {
                  return <li key={c.id}>{c.name}</li>;
                })}
            </ul>
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
        <NavLink
          to={`/locations/${location.id}/edit`}
          style={{ marginLeft: "5rem" }}
        >
          edit
        </NavLink>
      </div>
    </div>
  );
}
