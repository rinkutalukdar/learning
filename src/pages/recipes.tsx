import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import TabMenu from "../components/TabMenu";
import Layout from "../components/Layout";
import { addBookmark as addBookmarkAction, removeBookmark as removeBookmarkAction } from "../store";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi"
import axios from "axios";

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

  // Fetch bookmarks from MongoDB on component mount
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const response = await axios.get(`${process.env.NODE_BACKEND}/bookmarks`);
        const data: Recipe[] = response.data;
        data.forEach((bookmark) => {
          dispatch(addBookmarkAction(bookmark));
        });
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    loadBookmarks();
  }, [dispatch]);

  // GraphQL query to get all recipes
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

  // Check if a recipe is bookmarked
  const isBookmarked = (id: string) =>
    bookmarks.some((bookmark) => bookmark.id === id);

  // Handler for adding a bookmark
  const handleAddBookmark = async (recipe: Recipe) => {
    try {
      console.log(recipe);
  
      // Use the correct environment variable
      const response = await axios.post(
        `${process.env.NODE_BACKEND}/bookmarks`,
        recipe,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the request is sent as JSON
          },
        }
      );
  
      const savedBookmark = response.data; 
      // Dispatch the saved bookmark to the Redux store
      dispatch(addBookmarkAction(savedBookmark));
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Handler for removing a bookmark
  const handleRemoveBookmark = async (recipe: Recipe) => {
    try {
      await axios.delete(`${process.env.NODE_BACKEND}/bookmarks/${recipe.id}`);
      dispatch(removeBookmarkAction(recipe));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Recipes</h1>
        <TabMenu onSelectCategory={setCategory} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: "10px",
                padding: "10px",
                width: "200px",
              }}
            >
              <Link
                to={`/recipe/${recipe.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  style={{ width: "100%", borderRadius: "5px" }}
                />
                <h3>{recipe.strMeal}</h3>
              </Link>

              {isBookmarked(recipe.id) ? (
                <HiBookmark onClick={() =>
                  isBookmarked(recipe.id)
                    ? handleRemoveBookmark(recipe)
                    : handleAddBookmark(recipe)
                } className="text-green-500 text-2xl" />
              ) : (
                <HiOutlineBookmark onClick={() =>
                  isBookmarked(recipe.id)
                    ? handleRemoveBookmark(recipe)
                    : handleAddBookmark(recipe)
                } className="text-gray-500 text-2xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RecipesPage;
