import { json, redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";

import { createItem, getItems } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const items = await getItems(q);
  return json({ items, q });
};
export default function Index() {
  const navigation = useNavigation();

  const { items, q } = useLoaderData<typeof loader>();
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
        <h1>Item list</h1>
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
          {items.length ? (
            <ul>
              {items.map((item: any) => (
                <li key={item.id}>
                  <NavLink to={`/items/${item.id}`}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No items</i>
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

  data = await createItem({});
  return redirect(`/items/${data.id}/edit`);
};
