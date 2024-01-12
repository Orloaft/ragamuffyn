// root.tsx
import React, { useContext, useEffect, useState } from "react";
import { withEmotionCache } from "@emotion/react";
import { Box, ChakraProvider, background } from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node"; // Depends on the runtime you choose

import { ServerStyleContext, ClientStyleContext } from "./context";
import CollectionsNav from "./components/CollectionsNav";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const meta: MetaFunction = () => {
  return [
    {
      charset: "utf-8",
      title: "New Remix App",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "/styles/rpg-awesome.min.css",
    },
    {
      rel: "stylesheet",
      href: "/styles/globals.css",
    },
    { rel: "icon", href: "/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <title>Ragamuffyn</title>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body
          style={{
            background: `linear-gradient(90deg, rgba(2,0,36,0.9316059187346813) 0%, rgba(20,73,72,1) 47%)`,
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);
export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Document>
      <ChakraProvider>
        <CollectionsNav isVisible={isVisible} setIsVisible={setIsVisible} />
        <Provider store={store}>
          <Box>
            <Box
              minWidth="100vw"
              minHeight="100vh"
              paddingTop={isVisible ? "3rem" : "0"}
            >
              <Outlet />
            </Box>
          </Box>
        </Provider>
      </ChakraProvider>
    </Document>
  );
}
