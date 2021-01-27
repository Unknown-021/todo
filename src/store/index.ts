import { todos } from '@/store/todos';
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";


Vue.use(Vuex);

export const rootState = () => ({
  version: '1.0'
})

const store: StoreOptions<ReturnType<typeof rootState>> = {
  state: rootState(),
  modules: {
    todos,
  }
}

export default new Vuex.Store<ReturnType<typeof rootState>>(store);