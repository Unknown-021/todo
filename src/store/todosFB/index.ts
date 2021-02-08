import { actions } from './actions';
import { getters } from './getters';
import { mutations } from "./mutations";
import { rootState } from "@/store/";
import { Module } from "vuex"; 
import { TodoItem } from "@/store/todos/types";



type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;


const state = async () => {
  return {
    todosFB: [] as TodoItem[] | null,
  }
};


export const todosFB: () => Promise<Module<TodosState, ReturnType<typeof rootState>>> = async () => ({
  state: (await state()),
  mutations,
  getters,
  actions,
});

export type TodosState = Await<ReturnType<typeof state>>;
