import { configureStore } from "@reduxjs/toolkit";
import detailsSlice from "./detailsSlice";

export default configureStore({
  reducer: {
    details: detailsSlice,
  },
});
