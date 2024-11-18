import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Layout from "../components/Layout";
import TabMenu from "../components/TabMenu";
import RecipeCard from "../components/RecipeCard";
import { RootState } from "../store";
import {
  addBookmark as addBookmarkAction,
  removeBookmark as removeBookmarkAction,
} from "../store";

// Recipe interface for type safety
interface Recipe {
  id: string;
  strMeal: string;
  strMealThumb: string;
  category: string;
}

const RecipesPage: React.FC = () => {
  const [category, setCategory] = useState<string>("Indian");
  const dispatch = useDispatch();
  const bookmarks: Recipe[] = useSelector((state: any) => state.bookmarks);
  const { user, isAuthenticated } = useAuth0();

  // Fetch bookmarks from the backend on component mount
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const response = await axios.get(
          `${process.env.GATSBY_NODE_BACKEND}/bookmarks`
        );
        const data: Recipe[] = response.data;
        console.log(data)
        data.forEach((bookmark) => {
          dispatch(addBookmarkAction(bookmark));
        });
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    loadBookmarks();
  }, [dispatch]);

  // GraphQL query to fetch all recipes
  const data = useStaticQuery(graphql`
    query {
      allRecipe {
        nodes {
          id
          strMeal
          strMealThumb
          category
        }
      }
    }
  `);

  // Filter recipes based on the selected category
  const filteredRecipes: Recipe[] = data.allRecipe.nodes.filter(
    (recipe: Recipe) => recipe.category === category
  );

  // Check if a recipe is bookmarked by the current user using 'recipeID' and 'userUUID'
  const isBookmarked = (recipeID: string) => {
    if (!user || !user.sub) return false; // Ensure the user is authenticated and has a valid 'userUUID'
    const userUUID = user.sub; // Get the 'userUUID' from the authenticated user

    // Check if there's a bookmark matching the 'recipeID' and 'userUUID'
    return bookmarks.some(
      (bookmark) => bookmark.recipeID === recipeID && bookmark.userUUID === userUUID
    );
  };

  // Function to handle adding a bookmark
  const handleAddBookmark = async (recipe: Recipe) => {
    try {
      const userUUID = user?.sub || "guest-user-uuid"; // Use Auth0 user ID or fallback to a guest ID
      const response = await axios.post(
        `${process.env.GATSBY_NODE_BACKEND}/bookmarks`,
        {
          userUUID,
          recipeID: recipe.id,
        }
      );
      const savedBookmark = response.data;
      dispatch(addBookmarkAction(savedBookmark));
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Function to handle removing a bookmark
  const handleRemoveBookmark = async (bookmarkUUID: string) => {
    try {
      await axios.delete(`${process.env.GATSBY_NODE_BACKEND}/bookmark`, {
        params: { bookmarkUUID },
      });
      dispatch(removeBookmarkAction(bookmarkUUID));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{category} Recipes</h1>
        <TabMenu onSelectCategory={setCategory} />
        <div className="flex flex-wrap gap-4">
          {filteredRecipes.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isAuthenticated={isAuthenticated}
                  isBookmarked={isBookmarked}
                  handleAddBookmark={handleAddBookmark}
                  handleRemoveBookmark={handleRemoveBookmark}
                />
              ))}
            </div>
          ) : (
            <p className="text-center w-full text-gray-500">
              No recipes available for the selected category.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RecipesPage;
