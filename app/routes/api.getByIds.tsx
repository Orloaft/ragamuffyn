// File: routes/api/getDataByIds.js

import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { fetchDataEntriesById } from "~/data";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    // Parse the incoming request to get the array of IDs
    const requestBody = await request.json();
    const ids = requestBody.ids;

    if (!Array.isArray(ids)) {
      throw new Error("Invalid input");
    }

    // Fetch data entries matching these IDs from your backend or database
    const dataEntries = await fetchDataEntriesById(ids);

    // Return the array of data entries
    return json(dataEntries);
  } catch (error) {
    // Handle errors and return appropriate response
    return json({ error: error.message }, { status: 400 });
  }
};
