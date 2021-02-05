import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { todosFB } from './todosFB/index'
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

export const rootState = () => ({
  version: "1.0"
});

export default async () => {
  const StoreOptions: StoreOptions<ReturnType<typeof rootState>> = {
    state: rootState(),
    mutations: vuexfireMutations,
    modules: {
      // todos: await todos(),
      todosFB: await todosFB(),
    }
  };

  const store = new Vuex.Store<ReturnType<typeof rootState>>(StoreOptions);
  return store
}


