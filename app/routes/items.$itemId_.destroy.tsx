import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteItem } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.itemId, "Missing itemId param");

  await deleteItem(params.itemId);
  return redirect(`/items`);
};
