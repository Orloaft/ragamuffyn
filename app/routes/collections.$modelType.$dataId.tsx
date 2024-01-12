import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getDataById } from "../data";

import DataEntryView from "~/components/DataEntryView";
import { useDispatch } from "react-redux";
import { setDataObj, setLoading } from "~/redux/dataObjSlice";
import { useEffect } from "react";
import { AbsoluteCenter, Box, Button, Flex } from "@chakra-ui/react";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing characterId param");

  const data = await getDataById(params.dataId);
  if (!data) {
    // throw new Response("Not Found", { status: 404 });
  }
  return json({ data, model: params.modelType, id: params.dataId });
};

export default function Index() {
  const { data, model, id } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setDataObj(JSON.parse(data.data as string)));
  }, [data.data, dispatch]);
  return (
    <Box
      color="#dddddd"
      padding="1rem"
      borderRadius=".25rem"
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <AbsoluteCenter>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {data && (
            <DataEntryView data={data} type={model} useStore={true} id={id} />
          )}
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
            <Flex>
              <Button colorScheme="blue" type="submit">
                Delete
              </Button>
              <Button colorScheme="blue">
                <NavLink to={`/collections/${model}/${id}/edit`}>Edit</NavLink>
              </Button>
            </Flex>
          </Form>
        </div>
      </AbsoluteCenter>
    </Box>
  );
}
