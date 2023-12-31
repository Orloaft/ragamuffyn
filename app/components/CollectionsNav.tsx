import { Box, Tab, TabList, Tabs, Image } from "@chakra-ui/react";
import { NavLink, useLocation } from "@remix-run/react";
import { motion, useAnimation } from "framer-motion";
const MotionBox = motion(Box);
export default function CollectionsNav() {
  const location = useLocation();
  const currentPath = location.pathname;

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
  }; // Default to first tab if path not found
  let tabIndex = tabIndexMapping[extractPath()] ?? 0;
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({ x: -20, transition: { duration: 0.25 } }); // Slide up by 10px
  };

  const handleMouseLeave = () => {
    controls.start({ x: 0, transition: { duration: 0.25 } }); // Return to original position
  };
  return (
    <Tabs index={tabIndex}>
      {" "}
      <MotionBox
        width="fit-content"
        height="fit-content"
        position="absolute"
        right="10"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image src="/logo.png" alt="logo" borderRadius="50%" height="3rem" />
      </MotionBox>
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
          <NavLink to="/upload">upload</NavLink>
        </Tab>
      </TabList>
    </Tabs>
  );
}
