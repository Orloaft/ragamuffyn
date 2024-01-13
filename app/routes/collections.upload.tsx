import { Textarea, Button, Box, Select, Center } from "@chakra-ui/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { useState } from "react";
import { uploadBulkData } from "~/data";
export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  return null;
};
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  await uploadBulkData(formData);
  return redirect(`/`);
};

export default function Index() {
  const [jsonInput, setJsonInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  return (
    <Center>
      <Box
        p={4}
        background={"black"}
        border={"1px #dddddd solid"}
        color={"#dddddd"}
      >
        <Form method="post">
          <Select name="model" placeholder="Select option">
            <option value="notes">notes</option>
            <option value="encounters">encounters</option>
            <option value="items">items</option>
            <option value="characters">characters</option>
            <option value="campaigns">campaigns</option>
            <option value="locations">locations</option>
            <option value="npcs">npcs</option>
          </Select>
          <Textarea
            color="black"
            backgroundColor="#dddddd"
            placeholder="Paste JSON here"
            value={jsonInput}
            onChange={handleInputChange}
            name="data"
          />
          <Button type="submit" mt={2} colorScheme="blue">
            Upload
          </Button>
        </Form>
      </Box>
    </Center>
  );
}
