import { Box, Button, Center, Input, UnorderedList } from "@chakra-ui/react";
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
    <Box
      background={"black"}
      color="#dddddd"
      padding="1rem"
      height="100vh"
      zIndex="5"
      overflow={"auto"}
      border={"1px #dddddd solid"}
    >
      <div id="sidebar">
        <h1>{model}</h1>
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
            <Input
              color="black"
              border="1px grey solid"
              borderRadius=".25rem"
              backgroundColor="#dddddd"
              size="sm"
              width="auto"
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
            <Button colorScheme="blue" type="submit">
              New
            </Button>
          </Form>
        </div>
        <nav>
          {data && data.length ? (
            <UnorderedList
              style={{ listStyle: "none", padding: "10px" }}
              color="#dddddd"
            >
              {items.map((dataEntry: any) => (
                <li key={dataEntry.id}>
                  <NavLink to={`/collections/${model}/${dataEntry.id}`}>
                    {dataEntry.name || `no name`}
                  </NavLink>
                </li>
              ))}
            </UnorderedList>
          ) : (
            <p>
              <i>No {model}</i>
            </p>
          )}
        </nav>
      </div>
      <div
        className={
          navigation.state === "loading" && !searching ? "loading" : ""
        }
        id="detail"
      ></div>
    </Box>
  );
}
