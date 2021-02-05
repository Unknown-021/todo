import { RootState } from './../types';
import { TodosState } from './index';
import { GetterTree } from "vuex";
import { TodoItem } from "@/store/todos/types";

export const getters:GetterTree<TodosState, RootState>  = {
  getItems(state) {
    return state.todosFB;
  }
}