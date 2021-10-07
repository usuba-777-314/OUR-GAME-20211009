import GameState from "../application/gameState";
import GameWatchUseCase from "../application/gameWatchUseCase";

export const state = {
  /** ゲームリポジトリ */
  gameRepository: null,
  /** クイズリポジトリ */
  quizRepository: null,
  /** ゲーム */
  game: null,
};

export const getters = {
  /** ゲーム */
  game({ game }) {
    return game;
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
  /** ゲームを設定 */
  game(state, { game }) {
    state.game = game;
  },
};

export const actions = {
  /** リポジトリを設定する */
  setRepositories({ commit }, { gameRepository, quizRepository }) {
    commit("gameRepository", { gameRepository });
    commit("quizRepository", { quizRepository });
  },

  /** 初期化する。 */
  setup({ dispatch }) {
    dispatch("initializeState");
    dispatch("watchGame");
  },

  /** stateを初期化する。 */
  initializeState({ commit }) {
    const game = {
      state: GameState.WAITING,
      quiz: null,
    };
    commit("game", { game });
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
