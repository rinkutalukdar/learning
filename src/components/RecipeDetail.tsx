import React from "react";
import ActionBar from "./ActionBar";

interface RecipeDetailProps {
  strMealThumb: string;
  strMeal: string;
  strInstructions: string;
  extendedIngredients: string[];
  strSource?: string;
  id: string;
  views: number;
  isAuthenticated: boolean;
  isBookmarked: (id: string) => boolean;
  handleAddBookmark: (recipe: any) => void;
  handleRemoveBookmark: (recipe: any) => void;
  recipe: any;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  strMealThumb,
  strMeal,
  strInstructions,
  extendedIngredients,
  strSource,
  id,
  views,
  isAuthenticated,
  isBookmarked,
  handleAddBookmark,
  handleRemoveBookmark,
  recipe,
}) => {
  // Split instructions into individual steps
  const recipeSteps = strInstructions.trim().split(/\d+\.\s/).filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column: Image and Instructions */}
      <div className="md:basis-4/5 space-y-4">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-64 object-cover rounded shadow"
        />
        <h2 className="text-2xl font-semibold">Instructions</h2>
        <ul className="list-decimal list-inside">
          {recipeSteps.map((step, index) => (
            <li key={index} className="text-gray-800 mb-2">
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column: Ingredients and Action Bar */}
      <aside className="md:basis-1/5 bg-gray-50 rounded shadow-md p-4">
        {/* Action Bar at the Top */}
        <ActionBar
          id={id}
          views={views}
          isAuthenticated={isAuthenticated}
          isBookmarked={isBookmarked}
          handleAddBookmark={handleAddBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
          recipe={recipe}
        />

        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700">
          {extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        {strSource && (
          <a
            href={strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-500 hover:underline"
          >
            Source: {strSource}
          </a>
        )}
      </aside>
    </div>
  );
};

export default RecipeDetail;
