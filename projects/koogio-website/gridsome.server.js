// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async ({ addCollection }) => {
    const {
      data: { data }
    } = await axios.get(
      "https://koogio-admin-cms.herokuapp.com/api/v1/projects"
    );
    const sortedData = data.sort((a, b) => a.createTime - b.createTime);

    const collection = addCollection({
      typeName: "Project"
    });

    for (const project of sortedData) {
      const {
        id,
        description,
        title,
        googleLink,
        icon,
        screenshots,
        createTime
      } = project;

      collection.addNode({
        id,
        title,
        description,
        googleLink,
        icon,
        screenshots,
        createTime
      });
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
