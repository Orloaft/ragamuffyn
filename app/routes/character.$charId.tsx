import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { invariant } from "framer-motion";
import { getDataById } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.charId, "Missing dataId param");
  const data = await getDataById(params.charId);
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ data });
};

export default function Index() {
  return;
}
