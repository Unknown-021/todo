import { getters } from '@/store/todos/getters';
import { RootState } from './../types';
import { GetterTree } from "vuex";
import { User } from "./types";

export const getters:GetterTree<User, RootState>  = {
  getUserStatus(state, getters: any ) {
    return state.logged
  },
  getUserID(state, getters: any) {
    return state.userID;
  }
}