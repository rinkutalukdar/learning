const path = require('path');
const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const API_KEY = process.env.RECIPE_API_KEY;
const BASE_URL = process.env.RECIPE_BASE_URL;

const NEWS_API_URL = process.env.NEWSAPI_API_URL;
const NEWS_API_KEY = process.env.NEWSAPI_API_KEY;
const pageSize = 100; // Max number of items per request (as allowed by News API)
let page = 1;
let totalResults = 0;
let allArticles = [];

// Gatsby's sourceNodes API to create nodes from external APIs
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // --- Recipe Fetching Logic ---
  const categories = ['Indian'];

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
              type: 'Recipe',
              contentDigest: createContentDigest(detailedRecipe),
            },
          });
        } catch (detailError) {
          console.error(
            `Error fetching detailed data for meal ${meal.idMeal}:`,
            detailError
          );
        }
      }
    } catch (error) {
      console.error(`Error fetching recipes for ${category}:`, error);
    }
  }

  // --- News Fetching Logic ---
  try {
    // Initial request to get total number of results
    const initialResponse = await axios.get(NEWS_API_URL, {
      params: {
        apiKey: NEWS_API_KEY,
        pageSize: pageSize,
        page: page,
      },
    });

    totalResults = initialResponse.data.totalResults;
    allArticles = initialResponse.data.articles;

    // Calculate the number of pages needed
    const totalPages = Math.ceil(totalResults / pageSize);

    // Fetch remaining pages if there are more articles
    for (page = 2; page <= totalPages; page++) {
      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          pageSize: pageSize,
          page: page,
        },
      });
      allArticles = allArticles.concat(response.data.articles);
    }

    // Create nodes for all articles
    allArticles.forEach((article, index) => {
      createNode({
        ...article,
        id: createNodeId(`news-article-${index}`),
        parent: null,
        children: [],
        internal: {
          type: 'NewsArticle',
          contentDigest: createContentDigest(article),
        },
      });
    });
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
};

// Gatsby's createPages API to dynamically create pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // --- Create Pages for Recipes ---
  try {
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
        component: path.resolve('./src/pages/recipe.tsx'), // Template for recipe page
        context: {
          id: recipe.id, // Pass the recipe ID as context
        },
      });
    });
  } catch (error) {
    console.error('Error creating recipe pages:', error);
  }

  // --- Create Pages for News Articles ---
  try {
    const newsResult = await graphql(`
      query {
        allNewsArticle {
          nodes {
            id
            title
          }
        }
      }
    `);

    newsResult.data.allNewsArticle.nodes.forEach((article) => {
      createPage({
        path: `/news/${article.id}`, // URL path for each news article
        component: path.resolve('./src/pages/news.tsx'), // Template for news page
        context: {
          id: article.id, // Pass the article ID as context
        },
      });
    });
  } catch (error) {
    console.error('Error creating news pages:', error);
  }
};
