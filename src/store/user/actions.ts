import { getDB } from '@/api/idb';
import { RootState } from "./../types";
import { ActionTree } from "vuex";
import { User } from "./types";
import firebase from 'firebase/app'


export const actions: ActionTree<User, RootState> = {
  async setUser({ commit }, payload) {
    commit("SET_LOGIN",payload);
  },
  async logOut( {commit} ) {
    commit("SET_LOGGED_OUT");
    firebase.auth().signOut();
    console.log("Exit");
  }
}