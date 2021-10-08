import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
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
