import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";

export default function CollectionsNav() {
  return (
    <Tabs>
      <TabList background="grey">
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
