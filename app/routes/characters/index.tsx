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

import { createCharacter, getCharacters } from "~/data";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const characters = await getCharacters(q);
  return json({ characters, q });
};
export default function Index() {
  const navigation = useNavigation();

  const { characters, q } = useLoaderData<typeof loader>();
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
        <h1>Character list</h1>
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
          {characters.length ? (
            <ul>
              {characters.map((character: any) => (
                <li key={character.id}>
                  <NavLink to={`/characters/${character.id}`}>
                    {character.name},{character.id}
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

  data = await createCharacter({
    id: "",
    name: "no name",
    data: JSON.stringify({ name: "no name", level: 0, class: "", race: "" }),
  });
  return redirect(`/characters/${data.id}/edit`);
};
