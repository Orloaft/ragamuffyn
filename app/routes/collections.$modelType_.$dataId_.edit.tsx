import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  getDataById,
  type CampaignData,
  type CharData,
  updateDataEntry,
} from "../data";

import UpdateForm from "~/components/Form";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDataObj } from "~/redux/dataObjSlice";

function modelToDataType(model: string) {
  switch (model) {
    case "characters":
      return {} as CharData;
    case "campaigns":
      return {} as CampaignData;
  }
  return {} as CharData;
}
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing dataId param");
  const data = await getDataById(params.dataId);
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ data, model: params.modelType });
};

export default function EditContact() {
  const { data, model } = useLoaderData<typeof loader>();
  const dataObj = useSelector((state: any) => state.dataObj.dataObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataObj(JSON.parse(data.data as string)));
  }, [dispatch, data.data]);
  const modelType = modelToDataType(model as string);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {dataObj && <UpdateForm<typeof modelType> data={dataObj} />}
    </div>
  );
}
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.dataId, "Missing dataId param");
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
        key === "items" ||
        key === "encounters" ||
        key === "players" ||
        key === "npcs" ||
        key === "characters" ||
        key === "locations" ||
        key === "npcs" ||
        key === "notes"
      ) {
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

  await updateDataEntry(params.dataId as string, updates);
  return redirect(`/collections/${params.modelType}/${params.dataId}`);
};
