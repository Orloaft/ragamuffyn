import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCampaign } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.campaignId, "Missing campaignId param");
  const campaign = await getCampaign(parseInt(params.campaignId, 10));
  if (!campaign) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ campaign });
};

export default function Index() {
  const { campaign } = useLoaderData<typeof loader>();
  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
      }}
    >
      <div className="rpgui-container">
        {campaign.name}

        <Form
          action="destroy"
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="rpgui-button">
            Delete
          </button>
        </Form>
        <NavLink
          to={`/campaigns/${campaign.id}/edit`}
          style={{ marginLeft: "5rem" }}
        >
          edit
        </NavLink>
      </div>
    </div>
  );
}
