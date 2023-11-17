import {createSlice} from "@reduxjs/toolkit";
import {State} from "../types/types";

const initialState: State = {
  todoList: [
    { id: 1, key: 1, title: "Todo 1", description: "Todo 1", deadline: "2023-11-27", status: "Pending" },
    { id: 2, key: 2, title: "Todo 2", description: "Todo 2", deadline: "2023-11-26", status: "Pending" },
  ],
  trashList: [],
};

export const toDoSlider = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todoList.push(action.payload.newContent);
    },
    deleteToDo: (state, action) => {
      const { todoList } = state;
      const deletedItem = todoList.find((item) => item.id === action.payload.id);

      if (deletedItem) {
        state.todoList = todoList.filter((item) => item.id !== action.payload.id);
        deletedItem.status = "Deleted";
        state.trashList = [...state.trashList, deletedItem];
      }
    },
    editTodo: (state, action) => {
      const { todoList } = state;
      state.todoList = todoList.map((item) => item.id === action.payload.id ? action.payload : item);
    },
    completeTodo: (state, action) => {
      const { todoList } = state;
      const completedItemIndex = todoList.findIndex((item) => item.id === action.payload.id);

      if (completedItemIndex !== -1) {
        state.todoList[completedItemIndex].status = "Completed";
      }
    }
  },
})

export const { addToDo, deleteToDo, editTodo, completeTodo } = toDoSlider.actions

export default toDoSlider.reducer;