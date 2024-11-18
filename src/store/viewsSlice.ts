import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of a view
interface View {
  recipeID: string;
  count: number;
}

interface ViewsState {
  views: View[];
}

// Initial state
const initialState: ViewsState = {
  views: [],
};

// Create a slice for views
const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    // Action to increment the view count for a recipe
    incrementView: (state, action: PayloadAction<string>) => {
      const existingView = state.views.find(
        (view) => view.recipeID === action.payload
      );

      if (existingView) {
        // Increment the existing view count
        existingView.count += 1;
      } else {
        // Add a new view with a count of 1
        state.views.push({ recipeID: action.payload, count: 1 });
      }
    },
  },
});

// Export actions
export const { incrementView } = viewsSlice.actions;

// Export the reducer
export default viewsSlice.reducer;
