import { actions } from './actions';
import { getters } from '@/store/todos/getters';
import { mutations } from "./mutations";
import { rootState } from "@/store/";
import { Module } from "vuex";
import { TodoItem } from "@/store/todos/types";
import { getDB } from '@/api/idb';

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

const state = async () => {
  return {
    todos: await (await getDB()).getAll('todo') as TodoItem[]
  }
};

export const todos: () => Promise<Module<TodosState, ReturnType<typeof rootState>>> = async () => ({
  state: (await state()),
  mutations,
  getters,
  actions,
});

export type TodosState = Await<ReturnType<typeof state>>;
