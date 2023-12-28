import {
  useNavigation,
  useSubmit,
  Form,
  NavLink,
  Outlet,
} from "@remix-run/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData } from "~/redux/dataObjSlice";

export default function CollectionsView({ data, q, model }: any) {
  const navigation = useNavigation();

  const items = useSelector((state: any) => state.dataEntries.items);
  const submit = useSubmit();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [data, q]);
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  return (
    <div>
      <div id="sidebar">
        <h1>{model}:</h1>
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
          {data && data.length ? (
            <ul>
              {items.map((dataEntry: any) => (
                <li key={dataEntry.id}>
                  <NavLink to={`/collections/${model}/${dataEntry.id}`}>
                    {dataEntry.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No {model}</i>
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
