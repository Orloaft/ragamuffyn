import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCampaign, updateCampaign } from "../data";
import CampaignView from "~/components/CampaignView";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");
  const campaign = await getCampaign(params.campaignId);
  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ campaign, campaignId: params.campaignId });
};

export default function EditCampaign() {
  const { campaign, campaignId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <Form
      id="contact-form"
      method="post"
      style={{ display: "flex", justifyContent: "center", maxHeight: "30rem" }}
    >
      <div style={{ overflowY: "scroll" }}>
        <CampaignView
          id={campaignId}
          data={JSON.parse(campaign.data as string)}
        />

        <p>
          <button type="submit">Save</button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            type="button"
          >
            Cancel
          </button>
        </p>
      </div>
    </Form>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateCampaign(params.campaignId, updates);
  return redirect(`/campaigns/${params.campaignId}`);
};
