import { mutations } from './mutations';
import { TodoItem } from '@/store/todos/types';
import { RootState } from './../types';
import { ActionTree } from "vuex";
import { TodosState } from ".";
import { getDB } from '@/api/idb';
import { db } from '../../auth/email'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'



export const actions: ActionTree<TodosState, RootState> = {
  async addTodo({commit}, payload: TodoItem) {
    commit('ADD_TODO', payload);
    // (await getDB()).add("todo", payload, payload.id);
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
    (await getDB()).put("todo", payload, payload.id)
  },
  async addImportantStatus({commit}, payload: TodoItem) {
    commit('ADD_IMPORTANT', payload);
    (await getDB()).put("todo", payload, payload.id)
  },
  async deleteTodo({commit}, payload: string) {
    commit('DELETE_TODO', payload);
    (await getDB()).delete("todo", payload)
  },

}