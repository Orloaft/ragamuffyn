// utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

export let { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // Cookie options...
  });
