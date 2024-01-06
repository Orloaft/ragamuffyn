import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { invariant } from "framer-motion";
import BattleGrid from "~/components/battleGrid";
import { getDataById } from "~/data";
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

  return <BattleGrid encounterData={data} />;
}
