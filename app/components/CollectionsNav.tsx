import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { NavLink, useLocation } from "@remix-run/react";

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
  return (
    <Tabs index={tabIndex}>
      <TabList backgroundImage={"url('/marble.avif')"} color="#dddddd">
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
