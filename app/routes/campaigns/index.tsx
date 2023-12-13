import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";

import { createCampaign, getCampaigns } from "~/data";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const campaigns = await getCampaigns(q);
  return json({ campaigns, q });
};
export default function Index() {
  const navigation = useNavigation();

  const { campaigns, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  return (
    <div>
      <div id="sidebar">
        <h1>Campaign list</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form
            id="search-form"
            role="search"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
          >
            <input
              id="q"
              aria-label="Search contacts"
              className={searching ? "loading" : ""}
              placeholder="Search"
              defaultValue={q || ""}
              type="search"
              name="q"
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {campaigns.length ? (
            <ul>
              {campaigns.map((campaign: any) => (
                <li key={campaign.id}>
                  <NavLink to={`/campaigns/${campaign.id}`}>
                    {campaign.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No characters</i>
            </p>
          )}
        </nav>
        <Outlet />
      </div>
      <div
        className={
          navigation.state === "loading" && !searching ? "loading" : ""
        }
        id="detail"
      ></div>
    </div>
  );
}
export const action = async ({ request }: ActionFunctionArgs) => {
  let data;

  data = await createCampaign({});
  return redirect(`/campaigns/${data.id}/edit`);
};
