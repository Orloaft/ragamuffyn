import type { LoaderFunction } from "@remix-run/node";
import passport from "passport";

export const loader: LoaderFunction = ({ request }) => {
  return passport.authenticate("google", {
    scope: ["profile", "email"], // Adjust the scope according to your needs
  })(request);
};
