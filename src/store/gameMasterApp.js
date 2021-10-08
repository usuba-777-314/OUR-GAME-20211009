import GameState from "../application/gameState";
import GameStateNextUseCase from "../application/gameStateNextUseCase";
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
  /** 処理中か */
  isProcessing: false,
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
  /** 処理中か */
  isProcessing({ isProcessing }) {
    return isProcessing;
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
  /** 処理中かを設定 */
  isProcessing(state, { isProcessing }) {
    state.isProcessing = isProcessing;
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

    const isProcessing = false;
    commit("isProcessing", { isProcessing });
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

  /** ゲームの状態を次に進める。 */
  async nextGameState({ state, commit }) {
    const { gameRepository } = state;

    commit("isProcessing", { isProcessing: true });

    const gameStateNextUseCase = new GameStateNextUseCase({ gameRepository });
    await gameStateNextUseCase.next();

    commit("isProcessing", { isProcessing: false });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
