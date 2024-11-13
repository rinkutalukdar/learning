import React from "react";
import { graphql } from "gatsby";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { FaLeaf, FaClock, FaUtensils, FaExternalLinkAlt } from "react-icons/fa";

import { Url } from "url";

interface RecipeTemplateProps {
  data: {
    recipe: {
      title: string;
      image: string;
      instructions: string;
      extendedIngredients: any;
      preparationMinutes: any;
      dishTypes: any;
      sourceName: any;
      sourceUrl: Url;
    };
  };
}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({ data }) => {
  const { title, image, instructions, extendedIngredients, preparationMinutes, dishTypes, sourceName, sourceUrl } = data.recipe;

  return (
    <Layout>
      <div className="p-6">
        <Hero heroImage={image} heroTitle={title}/>
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column: Recipe Description & Instructions */}
          <div className="md:col-span-2">
            {/* Additional Details Section */}
            <div className="flex flex-wrap items-center gap-4 my-8 text-center">
              {preparationMinutes && (
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-gray-700">
                  <FaClock className="mr-2 text-blue-500" />
                  <span className="font-medium">{preparationMinutes} mins</span>
                </div>
              )}
              {dishTypes && dishTypes.length > 0 && (
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-gray-700">
                  <FaUtensils className="mr-2 text-green-500" />
                  <span className="font-medium">{dishTypes.join(", ")}</span>
                </div>
              )}
              {sourceName && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <FaExternalLinkAlt className="mr-2 text-red-500" />
                  <span className="font-medium">{sourceName}</span>
                </a>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="mb-4">{instructions}</p>

            <h2 className="text-2xl font-bold mb-2">Instructions</h2>
            <p className="mb-4">{instructions}</p>
          </div>

          {/* Sidebar: Recipe Ingredients */}
          <aside className="bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
            <div className="list-disc pl-5">
              {extendedIngredients.map((ingredient, index) => (
                <div key={index} className="flex">
                  <FaLeaf className="mr-2 text-green-500" /> <span className="font-medium">{ingredient.name}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: Int!) {
    recipe(itemid: { eq: $id }) {
      id
      itemid
      image
      title
      instructions
      sourceUrl
      sourceName
      dishTypes
      preparationMinutes
      extendedIngredients {
        id
        name
      }
    }
  }
`;

export default RecipeTemplate;