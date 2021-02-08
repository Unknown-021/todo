import { mutations } from "./mutations";
import { TodoItem } from "@/store/todos/types";
import { RootState } from "./../types";
import { ActionTree } from "vuex";
import { TodosState } from "./index";
import { db } from '../../auth/email';
import firebase from 'firebase/app'

export const actions: ActionTree<TodosState, RootState> = {
  async setTodo({ commit }, payload: string) {
    console.log(payload);
    const querySnapshot = await db.collection("todos").where("userID", "==", payload).get();
    const items = [] as TodoItem[];

    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    // console.log(items);
    commit("SET_TODOS", items);
  },

  async addTodo({commit}, payload: TodoItem) {
    commit('ADD_TODO', payload);
    const user = firebase.auth().currentUser;
    const id = user.uid;
    payload.userID = id;
    db.collection("todos").doc(payload.id).set(payload)
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error: any) => {
        console.error("Error writing document: ", error);
    });
  },
  async changeTodoStatus({commit}, payload: TodoItem) {
    commit('COMPLETE_TODO', payload);
    // (await getDB()).put("todo", payload, payload.id)
    const todoRef = db.collection("todos").doc(payload.id);
    return todoRef.update({
      done: true
    })

  },
  async addImportantStatus({commit}, payload: TodoItem) {
    commit('ADD_IMPORTANT', payload);
    const todoRef = db.collection("todos").doc(payload.id);
    return todoRef.update({
      important: true
    })
  },
  async deleteTodo({commit}, payload: string) {
    commit('DELETE_TODO', payload);
    // (await getDB()).delete("todo", payload)
  },

};
