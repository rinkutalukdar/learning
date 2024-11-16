const path = require('path');
const axios = require("axios");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const API_KEY = process.env.RECIPE_API_KEY;
const BASE_URL = process.env.RECIPE_BASE_URL;

const fetch = require("node-fetch");

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions;
  // const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
  const categories = ["Indian"];

  for (const category of categories) {
    try {
      // Fetch category-specific meals
      const response = await fetch(`${BASE_URL}/filter.php?a=${category}`);
      const data = await response.json();

      // Iterate through each meal and fetch detailed data
      for (const meal of data.meals) {
        try {
          const detailedResponse = await fetch(
            `${BASE_URL}/lookup.php?i=${meal.idMeal}`
          );
          const detailedData = await detailedResponse.json();
          const detailedRecipe = detailedData.meals[0];
          detailedRecipe.category = category; // Add category field

          // Create a node for each detailed recipe
          createNode({
            ...detailedRecipe,
            id: detailedRecipe.idMeal,
            parent: null,
            children: [],
            internal: {
              type: "Recipe",
              contentDigest: createContentDigest(detailedRecipe),
            },
          });
        } catch (detailError) {
          console.error(`Error fetching detailed data for meal ${meal.idMeal}:`, detailError);
        }
      }
    } catch (error) {
      console.error(`Error fetching recipes for ${category}:`, error);
    }
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
  // console.log(result)

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