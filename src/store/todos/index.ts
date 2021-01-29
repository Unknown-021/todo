import { mutations } from './mutations';
import { rootState } from '@/store/';
import { Module } from "vuex";
import { TodoItem } from "@/store/todos/types";
import { getters }from "@/store/todos/getters"

const state = () => ({
  todos: [] as TodoItem[]
})


export const todos: Module<TodosState, ReturnType<typeof rootState>> = {
  state: state(),
  mutations,
};



export type TodosState = ReturnType<typeof state>
