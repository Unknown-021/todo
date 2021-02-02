import Vue from "vue";
import App from "./App.vue";
import getStore from "@/store/index";
import vuetify from "@/plugins/vuetify";
import router from "./router";
import { openDB } from "idb";
import  {getDB}  from "./api/idb"

Vue.config.productionTip = false;

(async() => {
  const store = await getStore();
  new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
  }).$mount("#app");
})();


