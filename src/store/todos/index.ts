import { getters } from '@/store/todos/getters';
import { mutations } from "./mutations";
import { rootState } from "@/store/";
import { Module } from "vuex";
import { TodoItem } from "@/store/todos/types";

const state = () => ({
  todos: [] as TodoItem[]
});

export const todos: Module<TodosState, ReturnType<typeof rootState>> = {
  state: state(),
  mutations,
  getters,
};

export type TodosState = ReturnType<typeof state>;
