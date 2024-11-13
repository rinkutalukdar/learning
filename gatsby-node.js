const path = require('path');
const axios = require("axios");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const API_KEY = process.env.RECIPE_API_KEY;
const BASE_URL = process.env.RECIPE_BASE_URL;

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  //console.log(API_KEY, BASE_URL);

  try {
    // Fetch data from Spoonacular API
    const response = await axios.get(`${BASE_URL}/complexSearch?apiKey=${API_KEY}`);
    const recipes = response.data.results;

    // console.log(recipes);
    // Create a Gatsby node for each recipe
    for (const recipe of recipes) {
      const detailedResponse = await axios.get(
        `${BASE_URL}/${recipe.id}/information?apiKey=${API_KEY}&includeNutrition=true`
      );
      const detailedRecipe = detailedResponse.data;
      detailedRecipe.itemid = detailedRecipe.id;
      detailedRecipe.id = `recipe-${detailedRecipe.id}`;
      createNode({
        id: createNodeId(`recipe-${detailedRecipe.id}`),
        parent: null,
        children: [],
        internal: {
          type: "Recipe",
          contentDigest: createContentDigest(detailedRecipe),
        },
        ...detailedRecipe,
      });
    }
  } catch (error) {
    console.error("Error fetching data from Spoonacular API:", error);
  }
};

// Create pages for each recipe
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allRecipe {
        nodes {
          id
          itemid
          title
        }
      }
    }
  `);
  

  // Loop through each recipe and create a page
  result.data.allRecipe.nodes.forEach((recipe) => {
    // console.log(recipe);
    createPage({
      path: `/recipe/${recipe.id}`, // URL path for each recipe
      component: require.resolve("./src/pages/recipe.tsx"), // Path to the template
      context: {
        id: recipe.itemid, // Pass the recipe ID as context
      },
    });
  });
};