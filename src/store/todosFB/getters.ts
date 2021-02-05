import { RootState } from './../types';
import { TodosState } from './index';
import { GetterTree } from "vuex";
import { TodoItem } from "@/store/todos/types";

export const getters:GetterTree<TodosState, RootState>  = {
  getCurrentTodo(state: TodosState, getters: any ) {
    return (id: string) => {
        return state.todosFB.find(item => item.id == id);
    }
  },
  showUndoneTodo(state) {
    const undoneList = state.todosFB.filter(item => item.done == false);
    return undoneList;
  },
  showDoneTodo(state) {
    const doneList = state.todosFB.filter(item => item.done == true);
    return doneList;
  },
  showImportantTodo(state) {
    const importantList = state.todosFB.filter(item => item.important == true);
    return importantList;
  }
}