import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEncounter } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.encounterId, "Missing encounterId param");
  const encounter = await getEncounter(params.encounterId);
  if (!encounter) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ encounter, encounterId: params.encounterId });
};

export default function Index() {
  const { encounter } = useLoaderData<typeof loader>();

  const data = JSON.parse(encounter.data as string);

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div className="rpgui-container">
        <span>{encounter.name}</span>
        {encounter.data && (
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
          to={`/encounters/${encounter.id}/edit`}
          style={{ marginLeft: "5rem" }}
        >
          edit
        </NavLink>
      </div>
    </div>
  );
}
