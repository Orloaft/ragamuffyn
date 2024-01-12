import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { invariant } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import BattleGrid from "~/components/battleGrid";
import { getDataById } from "~/data";
import {
  setBg,
  setBgPosX,
  setBgPosY,
  setBgRotate,
  setBgSize,
  setCharacters,
  setDescription,
  setGridSize,
  setId,
  setInitiativeOrder,
  setName,
  setNpcs,
  setRound,
  updateCellProperties,
} from "~/redux/encounterSlice";
export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing characterId param");

  const data = await getDataById(params.dataId);
  if (!data) {
    // throw new Response("Not Found", { status: 404 });
  }

  return json({ data });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();

  useEffect(() => {
    const dataForRedux = data
      ? { id: data?.id, ...JSON.parse(data.data as string) }
      : {};

    if (dataForRedux.id) {
      console.log("setting up redux");
      dispatch(setDescription(dataForRedux.description));
      dispatch(setId(dataForRedux.id));
      dispatch(setName(data.name));
      dispatch(setBgSize(dataForRedux.gridProps.bgSize));
      dispatch(setNpcs(dataForRedux.npcs));
      dispatch(setRound(dataForRedux.round));
      dispatch(setInitiativeOrder(dataForRedux.initiativeOrder));
      dispatch(setGridSize(dataForRedux.gridProps?.gridSize));
      dispatch(setBgPosX(dataForRedux.gridProps?.bgPosX));
      dispatch(setBgPosY(dataForRedux.gridProps?.bgPosY));
      dispatch(setBgRotate(dataForRedux.gridProps?.bgRotate));
      dispatch(setBg(dataForRedux.gridProps?.bg));
      dispatch(updateCellProperties(dataForRedux.gridProps?.cellProperties));
      dispatch(setCharacters(dataForRedux.characters));
    }
  }, []);
  return <BattleGrid />;
}
