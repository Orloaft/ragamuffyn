import { Flex } from "@chakra-ui/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CollectionsView from "~/components/routeViews/Collections";
import { createDataEntry, getDataByModel } from "~/data";
import { setItems } from "~/redux/dataEntrySlice";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  console.log("requesting campania");
  const q = url.searchParams.get("q");
  const data = await getDataByModel(params.modelType as string, q);
  return json({ data, q, model: params.modelType });
};
export default function Index() {
  const { data, q, model } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();
  useEffect(() => {
    data && dispatch(setItems(data));
  }, [data, dispatch]);
  return (
    <Flex justify="space-between">
      <CollectionsView data={data} model={model} q={q} />
      <Flex align="center" width="70%" justify="center">
        <Outlet />
      </Flex>
    </Flex>
  );
}
export const action = async ({ request, params }: ActionFunctionArgs) => {
  let data;

  data = await createDataEntry(params.modelType as string);

  return redirect(`/collections/${params.modelType}/${data.id}/edit`);
};
