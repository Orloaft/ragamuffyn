import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { CampaignData } from "../data";
import { getCampaign, updateCampaign } from "../data";

import UpdateForm from "~/components/Form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");
  const campaign = await getCampaign(params.campaignId);
  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ campaign });
};

export default function EditCampaign() {
  const { campaign } = useLoaderData<typeof loader>();
  let campaignData = JSON.parse(campaign.data as string);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UpdateForm<CampaignData> data={campaignData} />
    </div>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");
  const formData = await request.formData();

  const formDataToObj = (formData: FormData) => {
    const obj: any = {};

    // Iterate over all keys in the FormData
    for (const key of formData.keys()) {
      const values = formData.getAll(key);

      // Check if there are multiple non-duplicate values for this key
      const uniqueValues = [...new Set(values)];
      if (
        uniqueValues.length > 1 ||
        key === "characters" ||
        key === "locations" ||
        key === "encounters" ||
        key === "players"
      ) {
        console.log("storing array", key);
        // Store as an array if there are multiple unique values
        obj[key] = uniqueValues;
      } else {
        // Store as a single value if there's only one unique value
        obj[key] = uniqueValues[0];
      }
    }

    return obj;
  };

  const updates = formDataToObj(formData);

  await updateCampaign(params.campaignId, updates);
  return null;
};
