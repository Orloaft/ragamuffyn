import {
  AbsoluteCenter,
  Button,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import invariant from "tiny-invariant";
import BattleGrid from "~/components/battleGrid";
import ImageUpload from "~/components/images/ImageUpload";
import { getDataById } from "~/data";
import { setDataObj } from "~/redux/dataObjSlice";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing dataId param");
  const data = await getDataById(params.dataId);
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ data, model: params.modelType });
};

export default function Index() {
  const { data, model } = useLoaderData<typeof loader>();
  const dataObj = useSelector((state: any) => state.dataObj.dataObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataObj(JSON.parse(data.data as string)));
  }, [dispatch, data.data]);

  return <BattleGrid background={"url('/parchment.webp')"} />;
}
