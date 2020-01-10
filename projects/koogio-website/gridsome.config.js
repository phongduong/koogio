// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "KOOGIO",
  siteDescription: "We are an indie game studio. We create casual games.",
  siteUrl: "https://koogio.now.sh",
  templates: {
    Project: "/project/:id"
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: "pug-plain-loader"
        }
      ]
    }
  },
  plugins: [
    {
      use: "gridsome-plugin-tailwindcss"
    },
    {
      use: "gridsome-plugin-pwa",
      options: {
        title: "KOOGIO",
        startUrl: "/",
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "manifest.json",
        serviceWorkerPath: "service-worker.js",
        cachedFileTypes: "js,json,css,html,png,jpg,jpeg,svg",
        shortName: "KOOGIO",
        themeColor: "#7f7a3f",
        backgroundColor: "#ffffff",
        icon: "src/favicon.png",
        msTileImage: "src/favicon.png",
        msTileColor: "#7f7a3f"
      }
    },
    {
      use: "@gridsome/plugin-sitemap"
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Project",
        latest: true,
        dateField: "createTime",
        feedOptions: {
          title: "KOOGIO's Projects",
          feed_url: "https://koogio.now.sh/rss.xml",
          site_url: "https://koogio.now.sh"
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: `https://koogio.now.sh/${node.id}`
        })
      }
    }
  ]
};
