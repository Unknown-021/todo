import { todos } from "@/store/todos";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

export const rootState = () => ({
  version: "1.0"
});

const StoreOptions: StoreOptions<ReturnType<typeof rootState>> = {
  state: rootState(),
  modules: {
    todos
  }
};

const store = new Vuex.Store<ReturnType<typeof rootState>>(StoreOptions);

export default store;

store.subscribe((mutation, state) => {
  // console.log(mutation.type)
  // console.log(mutation.payload)
  const jsonStore = JSON.stringify(state);
  localStorage.setItem("store", jsonStore);
  // console.log(localStorage.getItem('store')); ;
});
