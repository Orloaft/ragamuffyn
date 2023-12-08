import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteNpc } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.npcId, "Missing npcId param");

  await deleteNpc(parseInt(params.npcId, 10));
  return redirect(`/`);
};
