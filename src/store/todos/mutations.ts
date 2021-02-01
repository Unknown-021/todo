import { TodosState } from "./index";
import { MutationTree } from "vuex";
import { TodoItem, IBaseFile } from "@/store/todos/types";
import { v4 as uuidv4 } from "uuid";

export const mutations: MutationTree<TodosState> = {
  ADD_TODO(state, payload: TodoItem) {
    payload.id = uuidv4();
    state.todos.push({ ...payload });
  },
  ADD_FILE(state, payload: { id: string; file: IBaseFile }) {
    const currentTodo = state.todos.find(item => item.id == payload.id);
    console.log(currentTodo);
    currentTodo.attachments.push(payload.file);
  },
  DELETE_TODO(state, payload: string) {
    const todoArray = state.todos;
    const index = element => element.id == payload;
    const deleteItem = todoArray.findIndex(index);
    
    todoArray.splice(deleteItem, 1);
    state.todos = todoArray;
  },
  CHANGE_TODO_STATUS(state, payload: string) {
    const currentTodo = state.todos.find(item => item.id == payload);
    currentTodo.done = true;
  },
  COMPLETE_TODO(state, payload: TodoItem) {
    payload.done = true;
  }

};
