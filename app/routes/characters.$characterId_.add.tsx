import { json, type ActionFunctionArgs } from "@remix-run/node";
import { addToDataModel } from "~/data";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // Parse the form data from the request
  try {
    // Collect stream data
    let body = "";
    if (request.body) {
      const reader = request.body.getReader();
      let done, value;
      while (!done) {
        ({ done, value } = await reader.read());
        body += new TextDecoder().decode(value);
      }
    }

    // Parse the string as JSON
    const data = JSON.parse(body);
    if (params.characterId) {
      addToDataModel(params.characterId, data.campaignId);
    }

    // Handle your business logic here

    return json({ message: "Data processed successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Error processing data" });
  }
};
