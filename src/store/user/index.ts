import { actions } from './actions';
import { getters } from './getters';
import { mutations } from "./mutations";
import { rootState } from "@/store/";
import { Module } from "vuex"; 
import { TodoItem } from "@/store/todos/types";
import { db } from '../../auth/email'
import { User } from './types';


const state: User =  {
    logged: false,
    userID: '',

};

const namespaced = true;

export const user: Module<User, ReturnType<typeof rootState>> = {
  state: state,
  mutations,
  actions,
  getters,
}



