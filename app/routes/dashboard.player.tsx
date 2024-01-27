import { Box, Flex } from "@chakra-ui/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return json({});
};
export default function Index() {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      flexDirection={"column"}
      paddingTop={"4%"}
    >
      <Flex
        background={"rgba(0,0,0,0.75)"}
        border={"1px #dddddd solid"}
        padding={"1rem"}
        overflow={"auto"}
        color={"#dddddd"}
        width="100vw"
        alignItems={"center"}
        position="absolute"
        zIndex="25"
        top="0"
        gap="1rem"
      >
        <NavLink to={"/dashboard/player/characters/create"}>
          New character
        </NavLink>
        <NavLink to="">Load character</NavLink>

        <NavLink to="/login">Log Out</NavLink>
      </Flex>
      <Outlet />{" "}
    </Box>
  );
}
