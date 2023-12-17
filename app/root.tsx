import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const links: LinksFunction = () => [
  { href: "/RPGUI/dist/rpgui.css", rel: "stylesheet" },
  { rel: "script", href: "/RPGUI/dist/rpgui.js" },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Provider store={store}>
        <body className="rpgui-content rpgui-container framed-golden">
          <div id="sidebar">
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <NavLink to="/characters">Characters</NavLink>
              <NavLink to="/npcs">Npcs</NavLink>
              <NavLink to="/items">Items</NavLink>
              <NavLink to="/campaigns">Campaigns</NavLink>
              <NavLink to="/encounters">Ecounters</NavLink>
              <NavLink to="/locations">Locations</NavLink>
            </div>
            <Outlet />
          </div>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </Provider>
    </html>
  );
}
