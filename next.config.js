const withPWAInit = require("next-pwa");
const isDev = process.env.NODE_ENV !== "production";
const withPWA = withPWAInit({
  dest: "public",
    exclude: [
        // add buildExcludes here
        ({ asset, compilation }) => {
            if (
                asset.name.startsWith("server/") ||
                asset.name.match(/^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/)
            ) {
                return true;
            }
            if (isDev && !asset.name.startsWith("static/runtime/")) {
                return true;
            }
            return false;
        }
    ],
});
const path = require("path");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
    experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  webpack(config) {
        const registerJs = path.join(path.dirname(require.resolve("next-pwa")), "register.js");
        const entry = config.entry;

        config.entry = () =>
            entry().then((entries) => {
                // Automatically registers the SW and enables certain `next-pwa` features in
                // App Router (https://github.com/shadowwalker/next-pwa/pull/427)
                if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
                    if (Array.isArray(entries["main-app"])) {
                        entries["main-app"].unshift(registerJs);
                    } else if (typeof entries["main-app"] === "string") {
                        entries["main-app"] = [registerJs, entries["main-app"]];
                    }
                }
                return entries;
            });

        return config;
    },
};

module.exports = withPWA(nextConfig);
