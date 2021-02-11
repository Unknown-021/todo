import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/completed",
    name: "Completed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Completed.vue"),
  },
  {
    path: "/todo-list",
    name: "Todo-list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/TodoList.vue"),
  },
  {
    path: "/important",
    name: "Important",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Important.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Login.vue"),
  },
  {
    path: "/detailed/:id",
    name: "Todo",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TodoDetailed.vue"),
    beforeEnter: async (to, from, next) => {
      const vuex = await store();
      await vuex.state.todosFB.loadingPromise;
      // сделать проверку адреса тудушки
      const loadedTodo = await (await store()).getters.getCurrentTodo(to.params.id);
      console.log(loadedTodo.id);
      if(to.params.id != loadedTodo.id){
        next('Home')
      }
      next();
    },
  },
  {
    path: "*",
    redirect:{ name: "Home"}
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  (await store()).commit("SET_LOADING", true);

  return next();
});
// router.afterEach(async (to, from) => {
//   // (await store()).commit("SET_LOADING", false);
// });
export default router;
