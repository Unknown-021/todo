import { mutations } from './mutations';
import { rootState } from '@/store/';
import { Module } from "vuex";
import { TodoItem, TodoList } from "@/store/todos/types";

const state = () => ({
  todos: [] as TodoItem[]
})

// const state = () => ({
//   todoList: [] as TodoList[]
// })

export const todos: Module<TodosState, ReturnType<typeof rootState>> = {
  state: state(),
  mutations,
};

export type TodosState = ReturnType<typeof state>
