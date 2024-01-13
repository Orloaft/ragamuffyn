import { Box } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import { useState } from "react";
import CollectionsNav from "~/components/CollectionsNav";

export default function Index() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box>
      <CollectionsNav isVisible={isVisible} setIsVisible={setIsVisible} />
      <Box
        minWidth="100vw"
        minHeight="100vh"
        paddingTop={isVisible ? "3rem" : "0"}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
