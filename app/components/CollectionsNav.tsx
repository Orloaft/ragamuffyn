import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Tab, TabList, Tabs, IconButton } from "@chakra-ui/react";
import { NavLink, useLocation } from "@remix-run/react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
const MotionBox = motion(Box);
export default function CollectionsNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isVisible, setIsVisible] = useState(true);

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
    "/grid": 8,
    "/player": 9,
  }; // Default to first tab if path not found
  let tabIndex = tabIndexMapping[extractPath()] ?? 0;
  const controls = useAnimation();

  return (
    <MotionBox
      initial={{ y: "0" }}
      animate={controls}
      width="100%"
      position="relative"
    >
      <Tabs index={tabIndex} display={isVisible ? "block" : "none"}>
        <TabList
          backgroundImage={"url('/marble.avif')"}
          color="#dddddd"
          height="3rem"
        >
          <Tab>
            <NavLink to="/collections/characters">Characters</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/collections/npcs">Npcs</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/collections/items">Items</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/collections/campaigns">Campaigns</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/collections/encounters">Ecounters</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/collections/locations">Locations</NavLink>
          </Tab>{" "}
          <Tab>
            <NavLink to="/collections/notes">Notes</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/upload">Upload</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/grid">Grid</NavLink>
          </Tab>
          <Tab>
            <NavLink to="/player">Player</NavLink>
          </Tab>
        </TabList>
      </Tabs>
      <IconButton
        aria-label="hide"
        icon={isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={toggleNavVisibility}
        position="absolute"
        top={isVisible ? "0" : "40%"}
        right="1rem"
        zIndex="15"
      />
    </MotionBox>
  );
}
