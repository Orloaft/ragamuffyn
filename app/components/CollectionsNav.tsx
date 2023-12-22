import { NavLink } from "@remix-run/react";

export default function CollectionsNav() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      <NavLink to="/collections/characters">Characters</NavLink>
      <NavLink to="/collections/npcs">Npcs</NavLink>
      <NavLink to="/collections/items">Items</NavLink>
      <NavLink to="/collections/campaigns">Campaigns</NavLink>
      <NavLink to="/collections/encounters">Ecounters</NavLink>
      <NavLink to="/collections/locations">Locations</NavLink>
    </div>
  );
}
