import { todosFB } from './todosFB/index'
import { user } from './user/index'
import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";

Vue.use(Vuex);

export const rootState = () => ({
  version: "1.0",
});

let store: Store<ReturnType<typeof rootState>>;

export default async () => {
  if (!store) {
    const StoreOptions: StoreOptions<ReturnType<typeof rootState>> = {
      strict: true,
      state: rootState(),
      modules: {
        // todos: await todos(),
        todosFB: await todosFB(),
        user: user,

      }
    };

    store = new Vuex.Store<ReturnType<typeof rootState>>(StoreOptions);
  }
  return store
}


