import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteCampaign } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");

  await deleteCampaign(params.campaignId);
  return redirect(`/campaigns`);
};