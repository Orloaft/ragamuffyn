// File: routes/api/getDataByIds.js

import type { ActionFunctionArgs } from "@remix-run/node";

import { updateDataEntry } from "~/data";

export const action = async ({ request }: ActionFunctionArgs) => {
  const requestBody = await request.json();

  const data = await updateDataEntry(
    requestBody.updates.id,
    requestBody.updates
  );
  return data || null;
};
