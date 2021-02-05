import { TodosState } from "./index";
import { MutationTree } from "vuex";
import { TodoItem, IBaseFile } from "@/store/todos/types";
import { v1 as uuidv1 } from "uuid";
import { db } from '../../auth/email'

export const mutations: MutationTree<TodosState> = {
  SET_TODOS(state) {
    let items: TodoItem[]
    db.collection("todos").get().then((querySnapshot) => {
      items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      console.log(items);
      state.todosFB = items
    })
  },

}