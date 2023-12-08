import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteCharacter } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");

  await deleteCharacter(parseInt(params.characterId, 10));
  return redirect(`/`);
};
