import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/player_app/:userId",
    name: "PlayerApp",
    component: () =>
      import(/* webpackChunkName: "player" */ "@/views/PlayerApp.vue"),
  },
  {
    path: "/game_master_app",
    name: "GameMasterApp",
    component: () =>
      import(
        /* webpackChunkName: "gameMasterApp" */ "@/views/GameMasterApp.vue"
      ),
    props: { isGameMaster: true },
  },
  {
    path: "/sub_game_master_app",
    name: "SubGameMasterApp",
    component: () =>
      import(
        /* webpackChunkName: "gameMasterApp" */ "@/views/GameMasterApp.vue"
      ),
    props: { isGameMaster: false },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/not_found",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not_found" */ "../views/NotFound.vue"),
    alias: "*",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
