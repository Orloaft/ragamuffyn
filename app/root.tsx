import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import CollectionsNav from "./components/CollectionsNav";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const links: LinksFunction = () => [
  { href: "/styles/globals.css", rel: "stylesheet" },
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
            <CollectionsNav />
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
