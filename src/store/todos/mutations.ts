import { TodosState } from './index';
import { MutationTree } from "vuex";
import { TodoItem, TodoList } from "@/store/todos/types";




export const mutations: MutationTree<TodosState> = {
    ADD_TODO (state, payload: TodoItem){
        state.todos.push(payload)
    }
}