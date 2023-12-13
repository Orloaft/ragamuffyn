import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getCampaign, updateCampaign } from "../data";
import CampaignView from "~/components/CampaignView";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");
  const campaign = await getCampaign(parseInt(params.campaignId, 10));
  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ campaign });
};

export default function EditCampaign() {
  const { campaign } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <Form
      id="contact-form"
      method="post"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CampaignView data={JSON.parse(campaign.data as string)} />

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
  await updateCampaign(parseInt(params.campaignId, 10), updates);
  return redirect(`/campaigns/${params.campaignId}`);
};
