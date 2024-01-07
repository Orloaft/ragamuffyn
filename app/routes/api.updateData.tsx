// File: routes/api/getDataByIds.js

import type { ActionFunctionArgs } from "@remix-run/node";

import { updateDataEntry } from "~/data";

export const action = async ({ request }: ActionFunctionArgs) => {
  const requestBody = await request.json();
  console.log("request bod", requestBody);
  const data = await updateDataEntry(requestBody.id, requestBody.updates);
  return data;
};
