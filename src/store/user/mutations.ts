import { User } from "./types";
import { MutationTree } from "vuex";


export const mutations: MutationTree<User> = {
  SET_LOGIN(state, payload) {
    state.logged = true;
    state.userID = payload;
    
  },
  SET_LOGGED_OUT(state) {
    state.logged = false;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
}