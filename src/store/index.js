import Vue from "vue";
import Vuex from "vuex";
import gameMasterApp from "./gameMasterApp";
import playerApp from "./playerApp";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    gameMasterApp,
    playerApp,
  },
});
