import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import Dashboard from "~/components/Dashboard";
import CharacterSheet from "~/components/characterSheet";
import { getSession } from "~/utils/session.server";
export let loader = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  let role = session.get("role");
  if (!role) {
    throw redirect("/login");
  } else {
    return redirect(`/dashboard/${role}`);
  }
};
export default function Index() {
  let { role } = useLoaderData<any>();
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      minHeight={"fit-content"}
    >
      <Dashboard role={role} />
    </Flex>
  );
}
