import { mutations } from './mutations';
import { TodoItem } from '@/store/todos/types';
import { RootState } from './../types';
import { ActionTree } from "vuex";
import { TodosState } from ".";


export const actions: ActionTree<TodosState, RootState> = {
  async setTodo({commit}) {
    commit('SET_TODOS');
  }
}