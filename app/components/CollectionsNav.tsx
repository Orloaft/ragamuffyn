import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Tab,
  TabList,
  Tabs,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "@remix-run/react";
import { motion, useAnimation } from "framer-motion";

const MotionBox = motion(Box);

export default function CollectionsNav({ isVisible, setIsVisible }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleNavVisibility = () => {
    setIsVisible(!isVisible);
    controls.start({ y: isVisible ? "-100%" : "0" });
  };

  const extractPath = () => {
    const parts = currentPath.split("/");
    // Check if there are at least three slashes
    if (parts.length < 4) {
      return currentPath; // Return the original string if there are less than three slashes
    }

    // Join the first three parts and the leading part before the first slash
    return parts.slice(0, 3).join("/");
  };
  const navLinks = [
    { label: "Characters", path: "/collections/characters" },
    { label: "Npcs", path: "/collections/npcs" },
    { label: "Items", path: "/collections/items" },
    { label: "Campaigns", path: "/collections/campaigns" },
    { label: "Encounters", path: "/collections/encounters" },
    { label: "Locations", path: "/collections/locations" },
    { label: "Notes", path: "/collections/notes" },
    { label: "Upload", path: "/collections/upload" },
    { label: "Log out", path: "/login" },
  ];
  type TabIndexMapping = {
    [key: string]: number;
  };
  const tabIndexMapping: TabIndexMapping = {
    "/collections/characters": 0,
    "/collections/npcs": 1,
    "/collections/items": 2,
    "/collections/campaigns": 3,
    "/collections/encounters": 4,
    "/collections/locations": 5,
    "/collections/notes": 6,
    "/collections/upload": 7,
  }; // Default to first tab if path not found
  let tabIndex = tabIndexMapping[extractPath()] ?? 0;
  const controls = useAnimation();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  return (
    <MotionBox
      initial={{ y: "0" }}
      animate={controls}
      width="100vw"
      position="fixed"
      zIndex="20"
    >
      <Tabs
        colorScheme="white"
        variant="enclosed"
        index={tabIndex}
        display={isVisible ? "block" : "none"}
      >
        <TabList
          background={"rgba(0,0,0,0.75)"}
          color="#dddddd"
          height="3rem"
          overflowX={isSmallScreen ? "auto" : "initial"}
        >
          {isSmallScreen ? (
            <Menu>
              <Flex alignItems={"center"}>
                <MenuButton
                  colorScheme="grey"
                  as={IconButton}
                  icon={<ChevronDownIcon />}
                />{" "}
                <Text>Navigate</Text>
              </Flex>
              <MenuList background={`black`}>
                {navLinks.map((link, index) => (
                  <MenuItem key={index} background={"transparent"}>
                    <NavLink to={link.path}>{link.label}</NavLink>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ) : (
            navLinks.map((link, index) => (
              <Tab key={index}>
                <NavLink to={link.path}>{link.label}</NavLink>
              </Tab>
            ))
          )}
        </TabList>
      </Tabs>
      <IconButton
        size={"md"}
        colorScheme="grey"
        background={"black"}
        aria-label="hide"
        icon={<CopyIcon />}
        onClick={toggleFullScreen}
        position="fixed"
        top={isVisible ? "0" : "40%"}
        right="4rem"
      />
      <IconButton
        size={"md"}
        background={"black"}
        colorScheme="grey"
        aria-label="hide"
        icon={isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={toggleNavVisibility}
        position="fixed"
        top={isVisible ? "0" : "40%"}
        right="1rem"
      />
    </MotionBox>
  );
}
