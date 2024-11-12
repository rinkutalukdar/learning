import axios from "axios";


const API_KEY = process.env.RECIPE_API_KEY;
const BASE_URL = process.env.RECIPE_BASE_URL

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        // query,
        apiKey: API_KEY,
      },
    });
    console.log(response);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
