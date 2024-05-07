import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieDetails: {},
  actorsDetails: [],
  producerDetails: {},
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    updateMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    updateActorsDetails: (state, action) => {
      state.actorsDetails = action.payload;
    },
    updateProducerDetails: (state, action) => {
      state.producerDetails = action.payload;
    },
  },
});

export const {
  updateMovieDetails,
  updateActorsDetails,
  updateProducerDetails,
} = detailsSlice.actions;

export default detailsSlice.reducer;
