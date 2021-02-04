import Vue from "vue";
import App from "./App.vue";
import getStore from "@/store/index";
import vuetify from "@/plugins/vuetify";
import router from "./router";


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


