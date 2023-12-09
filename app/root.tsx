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
      <body className="rpgui-content rpgui-container framed-golden">
        <div id="sidebar">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <NavLink to="/characters">Characters</NavLink>
            <NavLink to="/npcs">Npcs</NavLink>
            <NavLink to="/items">Items</NavLink>
          </div>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
