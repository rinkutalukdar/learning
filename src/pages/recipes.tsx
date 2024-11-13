import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

const RecipesPage = ({ data }) => {
  console.log(data)
  const recipes = data.allRecipe.nodes; // Adjust based on your data source

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Indian Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-4 rounded shadow-md">
              <Link
                to={`/recipe/${recipe.idMeal}`}
                className="text-blue-500 hover:underline"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allRecipe {
      nodes {
        id
        idMeal
        strMeal
        strMealThumb
      }
    }
  }
`;

export default RecipesPage;
