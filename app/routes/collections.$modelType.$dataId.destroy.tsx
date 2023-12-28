import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteDataEntry } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.dataId, "Missing dataId param");

  await deleteDataEntry(params.dataId);
  return redirect(`/collections/${params.modelType}`);
};
