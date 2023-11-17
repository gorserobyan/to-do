import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./reducers/toDoSlider";

export default configureStore({
  reducer: {
      toDo: toDoReducer
  },
})