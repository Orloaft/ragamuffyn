import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { invariant } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import BattleGrid from "~/components/battleGrid";
import { EncounterData, getDataById } from "~/data";
import {
  setBg,
  setBgPosX,
  setBgPosY,
  setBgRotate,
  setDescription,
  setEncounterState,
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

  return json({ data, socketUrl: process.env.PUBLIC_SOCKET_URL });
};

export default function Index() {
  const { data, socketUrl } = useLoaderData<typeof loader>();
  const dispatch = useDispatch();

  const dataForRedux = useMemo(() => {
    return data ? { id: data?.id, ...JSON.parse(data.data as string) } : {};
  }, [data]);
  console.log("data:", data, "data for redux", dataForRedux);
  useEffect(() => {
    if (dataForRedux.id) {
      dispatch(setDescription(dataForRedux.description));
      dispatch(setId(dataForRedux.id));
      dispatch(setName(data.name));
      dispatch(setNpcs(dataForRedux.npcs));
      dispatch(setRound(dataForRedux.round));
      dispatch(setInitiativeOrder(dataForRedux.initiativeOrder));
      dispatch(setGridSize(dataForRedux.gridProps?.gridSize));
      dispatch(setBgPosX(dataForRedux.gridProps?.bgPosX));
      dispatch(setBgPosY(dataForRedux.gridProps?.bgPosY));
      dispatch(setBgRotate(dataForRedux.gridProps?.bgRotate));
      dispatch(setBg(dataForRedux.gridProps?.bg));
      dispatch(updateCellProperties(dataForRedux.gridProps?.cellProperties));
    }
  }, [dataForRedux]);
  return socketUrl && <BattleGrid socketUrl={socketUrl} />;
}
