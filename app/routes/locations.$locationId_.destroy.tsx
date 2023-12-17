import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteLocation } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.locationId, "Missing locationId param");

  await deleteLocation(params.locationId as string);
  return redirect(`/locations`);
};
