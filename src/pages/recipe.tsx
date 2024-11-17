import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import RecipeDetail from "../components/RecipeDetail";

// Define the types for the props
interface RecipeTemplateProps {
  data: {
    recipe: {
      id: string;
      strMealThumb: string;
      strMeal: string;
      strInstructions: string;
      strSource: string;
      views?: number;
      strIngredient1?: string;
      strIngredient2?: string;
      strIngredient3?: string;
      strIngredient4?: string;
      strIngredient5?: string;
      strIngredient6?: string;
      strIngredient7?: string;
      strIngredient8?: string;
      strIngredient9?: string;
      strIngredient10?: string;
    };
  };
  isAuthenticated: boolean;
  isBookmarked: (id: string) => boolean;
  handleAddBookmark: (recipe: any) => void;
  handleRemoveBookmark: (recipe: any) => void;
}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({
  data,
  isAuthenticated,
  isBookmarked,
  handleAddBookmark,
  handleRemoveBookmark,
}) => {
  const {
    id,
    strMealThumb,
    strMeal,
    strInstructions,
    strSource,
    ...ingredients
  } = data.recipe;

  // Filter out empty or undefined ingredients
  const extendedIngredients = Object.values(ingredients).filter(Boolean);
  let views = 0;
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{strMeal}</h1>
        <RecipeDetail
          id={id}
          strMealThumb={strMealThumb}
          strMeal={strMeal}
          strInstructions={strInstructions}
          extendedIngredients={extendedIngredients}
          strSource={strSource}
          views={views}
          isAuthenticated={isAuthenticated}
          isBookmarked={isBookmarked}
          handleAddBookmark={handleAddBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
          recipe={data.recipe}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    recipe(id: { eq: $id }) {
      id
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
    }
  }
`;

export default RecipeTemplate;
