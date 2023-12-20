import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { CharData } from "../data";
import { getCharacter, updateCharacter } from "../data";
import UpdateForm from "~/components/Form";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const character = await getCharacter(params.characterId);
  if (!character) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ character });
};

export default function EditContact() {
  const { character } = useLoaderData<typeof loader>();
  let characterData = JSON.parse(character.data as string);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UpdateForm<CharData> data={characterData} />
    </div>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.characterId, "Missing characterId param");
  const formData = await request.formData();

  const formDataToObj = (formData: FormData) => {
    const obj: any = {};

    // Iterate over all keys in the FormData
    for (const key of formData.keys()) {
      const values = formData.getAll(key);

      // Check if there are multiple non-duplicate values for this key
      const uniqueValues = [...new Set(values)];
      console.log(key);
      if (uniqueValues.length > 1 || key === "items") {
        // Store as an array if there are multiple unique values
        console.log("key of form:", key);
        obj[key] = uniqueValues;
      } else {
        // Store as a single value if there's only one unique value
        obj[key] = uniqueValues[0];
      }
    }

    return obj;
  };

  const updates = formDataToObj(formData);

  await updateCharacter(params.characterId, updates);
  return null;
};
