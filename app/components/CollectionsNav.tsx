import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
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
    { label: "notes", path: "/collections/notes" },
    { label: "Upload", path: "/upload" },

    { label: "Player", path: "/player" },
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
    "/upload": 7,
    "/player": 9,
  }; // Default to first tab if path not found
  let tabIndex = tabIndexMapping[extractPath()] ?? 0;
  const controls = useAnimation();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <MotionBox
      initial={{ y: "0" }}
      animate={controls}
      width="100%"
      position="fixed"
      zIndex="20"
    >
      <Tabs index={tabIndex} display={isVisible ? "block" : "none"}>
        <TabList
          backgroundImage={"url('/marble.avif')"}
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
              <MenuList background={`url("/marble.avif")`}>
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
        size={"lg"}
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
