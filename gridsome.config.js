const tailwind = require("tailwindcss");

const postcssPlugins = [tailwind()];

if (process.env.NODE_ENV === "production")
  postcssPlugins.push(require("autoprefixer"));

module.exports = {
  siteName: "Koogio",
  siteDescription:
    "Koogio is a collection of content created by Phong Duong. It includes blog, newsletter, stream and Youtube video",
  siteUrl: "https://koogio.now.sh",
  metadata: {},
  plugins: [],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
