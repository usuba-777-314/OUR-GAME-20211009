import GameState from "../application/gameState";
import GameWatchUseCase from "../application/gameWatchUseCase";
import TopResultWatchUseCase from "../application/topResultWatchUseCase";

export const state = {
  /** ゲームリポジトリ */
  gameRepository: null,
  /** クイズリポジトリ */
  quizRepository: null,
  /** ユーザリポジトリ */
  userRepository: null,
  /** ゲーム */
  game: null,
  /** 最優秀者情報 */
  topResult: null,
};

export const getters = {
  /** ゲーム */
  game({ game }) {
    return game;
  },
  /** 最優秀者情報 */
  topResult({ topResult }) {
    return topResult;
  },
};

export const mutations = {
  /** ゲームリポジトリを設定 */
  gameRepository(state, { gameRepository }) {
    state.gameRepository = gameRepository;
  },
  /** クイズリポジトリを設定 */
  quizRepository(state, { quizRepository }) {
    state.quizRepository = quizRepository;
  },
  /** ユーザリポジトリを設定 */
  userRepository(state, { userRepository }) {
    state.userRepository = userRepository;
  },
  /** ゲームを設定 */
  game(state, { game }) {
    state.game = game;
  },
  /** 最優秀者情報を設定 */
  topResult(state, { topResult }) {
    state.topResult = topResult;
  },
};

export const actions = {
  /** リポジトリを設定する */
  setRepositories(
    { commit },
    { gameRepository, quizRepository, userRepository }
  ) {
    commit("gameRepository", { gameRepository });
    commit("quizRepository", { quizRepository });
    commit("userRepository", { userRepository });
  },

  /** 初期化する。 */
  setup({ dispatch }) {
    dispatch("initializeState");
    dispatch("watchGame");
    dispatch("watchTopResult");
  },

  /** stateを初期化する。 */
  initializeState({ commit }) {
    const game = {
      state: GameState.WAITING,
      quiz: null,
    };
    commit("game", { game });

    const topResult = { correctCount: 0, users: [] };
    commit("topResult", { topResult });
  },

  /** ゲームを監視する。 */
  watchGame({ state, commit }) {
    const { gameRepository, quizRepository } = state;

    const gameWatchUseCase = new GameWatchUseCase({
      gameRepository,
      quizRepository,
    });

    gameWatchUseCase.watch().subscribe((game) => {
      commit("game", { game });
    });
  },

  /** 最優秀者情報を監視する。 */
  watchTopResult({ state, commit }) {
    const { userRepository } = state;

    const topResultWatchUseCase = new TopResultWatchUseCase({
      userRepository,
    });

    topResultWatchUseCase.watch().subscribe((topResult) => {
      commit("topResult", { topResult });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
