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
    const response = await axios.get(`${BASE_URL}/filter.php?a=Indian`);
    const recipes = response.data.meals;

    // console.log(response.data)

    // console.log(recipes);
    // Create a Gatsby node for each recipe
    for (const recipe of recipes) {
      // console.log(recipe)
      const detailedResponse = await axios.get(
        `${BASE_URL}/lookup.php?i=${recipe.idMeal}`
      );
      
      const detailedRecipe = detailedResponse.data.meals[0];
      // console.log(detailedRecipe);
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

// Create pages for each recipe
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
  

  // Loop through each recipe and create a page
  console.log(result)
  result.data.allRecipe.nodes.forEach((recipe) => {
    // console.log(recipe);
    createPage({
      path: `/recipe/${recipe.idMeal}`, // URL path for each recipe
      component: require.resolve("./src/pages/recipe.tsx"), // Path to the template
      context: {
        id: recipe.id, // Pass the recipe ID as context
      },
    });
  });
};