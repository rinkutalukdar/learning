import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import TabMenu from "../components/TabMenu";
import Layout from "../components/Layout";

const RecipesPage = () => {
  const [category, setCategory] = useState("Indian");

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
  const filteredRecipes = data.allRecipe.nodes.filter(
    (recipe) => recipe.category === category
  );

  return (
    <Layout>
      <div>
        <h1>Recipes</h1>
        <TabMenu onSelectCategory={setCategory} />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredRecipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`} // Link to the detailed recipe page
              key={recipe.id}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: "10px",
                padding: "10px",
                width: "200px",
                display: "block",
              }}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <h3>{recipe.strMeal}</h3>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RecipesPage;
