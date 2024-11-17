import React from "react";
import { HiBookmark, HiOutlineBookmark, HiShare } from "react-icons/hi";
import { FaEye } from "react-icons/fa";

const RecipeCard = ({ recipe, isAuthenticated, isBookmarked, handleAddBookmark, handleRemoveBookmark }) => {
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
          isBookmarked(recipe.id) ? (
            <HiBookmark
              onClick={() => handleRemoveBookmark(recipe)}
              className="text-green-500 text-2xl cursor-pointer hover:text-green-600"
            />
          ) : (
            <HiOutlineBookmark
              onClick={() => handleAddBookmark(recipe)}
              className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
            />
          )
        ) : (
          <HiOutlineBookmark className="text-gray-300 text-2xl" />
        )}

        {/* Share Icon */}
        <HiShare
          className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600"
          onClick={() => alert("Share functionality here")}
        />

        {/* Views Icon and Number of Views */}
        <div className="flex items-center text-gray-600">
          <FaEye className="text-xl mr-1" />
          <span>{recipe.views || 0}</span> {/* Display number of views */}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
