import firebase from "firebase/app";
import { TodosState } from "./index";
import { MutationTree } from "vuex";
import { TodoItem, IBaseFile } from "@/store/todosFB/types";
import { v1 as uuidv1 } from "uuid";
import { fileParse } from "../../helpers/fileParse"


export const mutations: MutationTree<TodosState> = {
  SET_TODOS(state, items) {
    state.todosFB = items
    state.resolveLoading();
  },
  ADD_TODO(state, payload: TodoItem) {
    payload.id = uuidv1();
    state.todosFB!.push({ ...payload });
  },
  ADD_FILE(state, payload: { id: string; file: File, fileUrl: string}) {
    const currentTodo = state.todosFB!.find(item => item.id == payload.id);
    currentTodo?.attachments.push(fileParse(payload.file,payload.fileUrl));
  },
  DELETE_TODO(state, payload: string) {
    const todoArray = state.todosFB;
    const index = element => element.id == payload;
    const deleteItem = todoArray!.findIndex(index);

    todoArray!.splice(deleteItem, 1);
    state.todosFB = todoArray;
  },
  CHANGE_TODO_STATUS(state, payload: string) {
    const currentTodo = state.todosFB!.find(item => item.id == payload);
    currentTodo!.done = true;
  },
  COMPLETE_TODO(state, payload: TodoItem) {
    payload.done = true;
  },
  ADD_IMPORTANT(state, payload: TodoItem) {
    payload.important = !payload.important;
  }
}