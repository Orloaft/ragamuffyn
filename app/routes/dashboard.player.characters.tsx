import { json } from "@remix-run/node";
import { getDataByModel } from "~/data";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await getDataByModel("characters");
  return json({ data });
};
export default function Index() {
  return;
}
