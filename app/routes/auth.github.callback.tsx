// app/routes/auth/github/callback.tsx
import type { LoaderFunction } from "@remix-run/node";
import passport from "passport";

export const loader: LoaderFunction = ({ request }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("github", (err, user, info) => {
      if (err) {
        return reject(err);
      }
      if (!user) {
        // Handle the case where the user is not authenticated
      }
      // Handle successful authentication
      // e.g., create a session, redirect to a dashboard, etc.
    })(request);
  });
};
