import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout"

interface RecipeTemplateProps {
  data: {
    recipe: {
      id: String;
      strMealThumb: string;
      strMeal: string;
      strInstructions: string;
      strSource: string;
      sourceName: string;
      // dishTypes: string[];
      // preparationMinutes: number;
      // extendedIngredients: Array<{
      //   name: string;
      // }>;
    };
  };
}


const RecipeTemplate: React.FC<RecipeTemplateProps> = ({ data }) => {
  const recipeData = data.recipe;

  const extendedIngredients = [
    recipeData.strIngredient1,
    recipeData.strIngredient2,
    recipeData.strIngredient3,
    recipeData.strIngredient4,
    recipeData.strIngredient5,
    recipeData.strIngredient6,
    recipeData.strIngredient7,
    recipeData.strIngredient8,
    recipeData.strIngredient9,
    recipeData.strIngredient10
  ];
  const recipeSteps = recipeData.strInstructions.trim().split(/\d+\.\s/).filter(Boolean);
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{recipeData.strMeal}</h1>
        <div className="flex gap-6">
          {/* Left Column: Image and Instructions */}
          <div className="basis-4/5 space-y-4">
            <img
              src={recipeData.strMealThumb}
              alt={recipeData.strMeal}
              className="w-full h-64 object-cover rounded shadow"
            />
            <h2 className="text-2xl font-semibold">Instructions</h2>
            {/* <p className="text-gray-800">{recipeData.strInstructions}</p> */}
            <ul>
              {recipeSteps.map((step, index) => (
                <li key={index}>{index + 1}. {step}</li>
              ))}
            </ul>
          </div>

          {/* Right Column: Ingredients */}
          <aside className="basis-1/5 bg-gray-50 p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <a href={recipeData.strSource}>{recipeData.strSource}</a>
            <ul>
              {extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    recipe(id: { eq: $id }) {
      id
      idMeal
      strMeal
      strInstructions
      strMealThumb
      strSource
      strIngredient1
      strIngredient2
      strIngredient3
      strIngredient4
      strIngredient5
      strIngredient6
      strIngredient7
      strIngredient8
      strIngredient9
      strIngredient10
      strYoutube

    }
  }
`;

export default RecipeTemplate;
