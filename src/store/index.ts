import { todos } from "@/store/todos";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

export const rootState = () => ({
  version: "1.0"
});

export default async () => {
  const StoreOptions: StoreOptions<ReturnType<typeof rootState>> = {
    state: rootState(),
    modules: {
      todos: await todos()
    }
  };

  const store = new Vuex.Store<ReturnType<typeof rootState>>(StoreOptions);
  return store
}


