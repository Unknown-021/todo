import { User } from "./types";
import { MutationTree } from "vuex";


export const mutations: MutationTree<User> = {
  SET_LOGIN(state, payload:{id: string, email: string}) {
    state.logged = true;
    state.userID = payload.id;
    state.userEmail = payload.email;
  },
  SET_LOGGED_OUT(state) {
    state.logged = false;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
}