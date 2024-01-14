import { Box, Button } from "@chakra-ui/react";
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
      <Button position={"fixed"} top={"0"} right={"0"}>
        <NavLink to="/login">Log Out</NavLink>
      </Button>
      <Box
        background={"black"}
        border={"1px #dddddd solid"}
        color={"#dddddd"}
        padding={"1rem"}
      >
        <Button>
          <NavLink to="/collections">Collections</NavLink>
        </Button>
      </Box>
    </Box>
  );
}
