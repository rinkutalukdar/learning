const path = require('path');
const axios = require("axios");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const API_KEY = process.env.RECIPE_API_KEY;
const BASE_URL = process.env.RECIPE_BASE_URL;

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  try {
    // Fetch data from Spoonacular API
    const response = await axios.get(`${BASE_URL}/filter.php?a=Indian`);
    const recipes = response.data.meals;

    // Create a Gatsby node for each recipe
    for (const recipe of recipes) {
      const detailedResponse = await axios.get(
        `${BASE_URL}/lookup.php?i=${recipe.idMeal}`
      );
      
      const detailedRecipe = detailedResponse.data.meals[0];
      createNode({
        id: createNodeId(`${detailedRecipe.idMeal}`),
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

// gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allRecipe {
        nodes {
          id
          idMeal
        }
      }
    }
  `);

  result.data.allRecipe.nodes.forEach((recipe) => {
    createPage({
      path: `/recipe/${recipe.id}`, // URL path for each recipe
      component: require.resolve("./src/pages/recipe.tsx"), // Use the template in src/templates
      context: {
        id: String(recipe.id), // Pass the recipe ID as context
      },
    });
  });
};