// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const {
      data: { data }
    } = await axios.get(
      "https://koogio-admin-cms.herokuapp.com/api/v1/projects"
    );

    const collection = addCollection({
      typeName: "Project"
    });

    for (const project of data) {
      const { id, description, title, googleLink, icon, screenshots } = project;

      collection.addNode({
        id,
        title,
        description,
        googleLink,
        icon,
        screenshots
      });
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
