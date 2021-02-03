import { mutations } from './mutations';
import { TodoItem } from '@/store/todos/types';
import { RootState } from './../types';
import { ActionTree } from "vuex";
import { TodosState } from ".";
import { getDB } from '@/api/idb';



export const actions: ActionTree<TodosState, RootState> = {
  async addTodo({commit}, payload: TodoItem) {
    commit('ADD_TODO', payload);
    (await getDB()).add("todo", payload, payload.id)
  },
  async changeTodoStatus({commit}, payload: TodoItem) {
    commit('COMPLETE_TODO', payload);
    (await getDB()).put("todo", payload, payload.id)
  },
  async deleteTodo({commit}, payload: string) {
    commit('DELETE_TODO', payload);
    (await getDB()).delete("todo", payload)
  }
}