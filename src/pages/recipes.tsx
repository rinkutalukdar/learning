import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../services/recipeService";
import Layout from "../components/Layout";
import Recipe from "../components/Recipe"

interface Recipe {
  id: number;
  title: string;
  image: string;
}

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes("pasta");
      setRecipes(data);
    };

    getRecipes();
  }, []);

  return (
    <Layout>
      <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">From the Receipes</h2>
      <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>

      {/* Render the current chapter and its items */}
      <h2 className="text-2xl font-semibold mb-4">
        Recipie
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipeData={recipe} />
        ))}
      </div>
    </Layout>
  );
};

export default RecipesPage;


