import { Box, Flex } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";

export default function Index() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
    >
      <Flex
        background={"rgba(0,0,0,0.75)"}
        border={"1px #dddddd solid"}
        color={"#dddddd"}
        padding={"1rem"}
        direction={"column"}
      >
        <NavLink to="/collections">Collections</NavLink>
        <NavLink to="/login">Log Out</NavLink>
      </Flex>
    </Box>
  );
}
