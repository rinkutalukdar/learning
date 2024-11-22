import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { incrementView } from "../store/viewsSlice";

// Props for the RecipeCard
interface RecipeCardProps {
  id: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeCard = ({ recipe, isAuthenticated, isBookmarked, handleAddBookmark, handleRemoveBookmark }) => {
  const dispatch = useDispatch();
  const viewCount = useSelector((state: RootState) =>
    state.views.views.find((view) => view.recipeID === recipe.id)?.count || 0
  );

   // Increment the view count when the component mounts
  useEffect(() => {
    dispatch(incrementView(recipe.id));
  }, [dispatch, recipe.id]);


  return (
    <div
      key={recipe.id}
      className="mb-4 break-inside-avoid border border-gray-300 rounded-md p-4 shadow-md"
    >
      {/* Recipe Image and Title */}
      <a href={`/recipe/${recipe.id}`} className="text-inherit no-underline">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full rounded-md"
        />
        <h3 className="mt-2 font-semibold text-gray-800">{recipe.strMeal}</h3>
      </a>

      {/* Action Bar */}
      <div className="flex items-center justify-between mt-4">
        {/* Bookmark Icon */}
        {isAuthenticated ? (
          isBookmarked(id) ? (
            <span
              onClick={() => handleRemoveBookmark(recipe)}
              className="text-green-500 text-2xl cursor-pointer hover:text-green-600"
            >Bookmarked
            </span>
          ) : (
            <span
              onClick={() => handleAddBookmark(recipe)}
              className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
            >
            Bookmark
            </span>
          )
        ) : (
          <span
            className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
          >
            Bookmark
          </span>
        )}


        {/* Share Icon */}
        <span
          className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600"
          onClick={() => alert("Share functionality here")}
        >Share</span>

        {/* Views Icon and Number of Views */}
        <div className="flex items-center text-gray-600">
          VIEW
          <span>{viewCount || 0}</span> {/* Display number of views */}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
