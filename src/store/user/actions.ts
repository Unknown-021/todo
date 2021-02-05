import { RootState } from "./../types";
import { ActionTree } from "vuex";
import { User } from "./types";
import firebase from 'firebase/app'


export const actions: ActionTree<User, RootState> = {
  async setUser({ commit }) {
    const user = await firebase.auth().currentUser;
    const id = user.uid;
    commit("SET_LOGIN",id);
  },
  async logOut( {commit} ) {
    commit("SET_LOGGED_OUT");
    firebase.auth().signOut();
    console.log("Exit");
  }
}