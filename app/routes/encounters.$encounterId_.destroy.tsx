import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteEncounter } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.encounterId, "Missing encounterId param");

  await deleteEncounter(params.encounterId);
  return redirect(`/encounters`);
};
