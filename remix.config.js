/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  environmentVariables: {
    PUBLIC_APP_URL: process.env.PUBLIC_APP_URL,
    PUBLIC_SOCKET_URL: process.env.PUBLIC_SOCKET_URL
  }
};
