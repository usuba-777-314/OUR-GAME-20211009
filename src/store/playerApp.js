import GameWatchUseCase from "../application/gameWatchUseCase";
import UserFetchUseCase from "../application/userFetchUseCase";
import GameState from "../application/gameState";

export const state = {
  /** ゲームリポジトリ */
  gameRepository: null,
  /** クイズリポジトリ */
  quizRepository: null,
  /** ユーザリポジトリ */
  userRepository: null,
  /** ユーザID */
  userId: null,
  /** ユーザ */
  user: null,
  /** ゲーム */
  game: null,
};

export const getters = {
  /** ゲーム */
  game({ game }) {
    return game;
  },
  /** ユーザ */
  user({ user }) {
    return user;
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
  /** ユーザIDを設定 */
  userId(state, { userId }) {
    state.userId = userId;
  },
  /** ユーザを設定 */
  user(state, { user }) {
    state.user = user;
  },
  /** ゲームを設定 */
  game(state, { game }) {
    state.game = game;
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
  async setup({ commit, dispatch }, { userId }) {
    commit("userId", { userId });
    dispatch("initializeState");
    await dispatch("authentication");
    dispatch("watchGame");
  },

  /** stateを初期化する。 */
  initializeState({ commit }) {
    const user = null;
    commit("user", { user });

    const game = {
      state: GameState.WAITING,
      quiz: null,
    };
    commit("game", { game });
  },

  async authentication({ state, commit }) {
    const { userRepository, userId } = state;

    const userFetchUseCase = new UserFetchUseCase({ userRepository });
    const user = await userFetchUseCase.fetch({ userId });

    if (user == null)
      throw new UnauthenticationError(`User is not found. userId: ${userId}`);

    commit("user", { user });
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

/** 未認証エラー */
export class UnauthenticationError extends Error {
  /** 未認証エラーを構築する。 */
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthenticationError);
    }

    this.name = "UnauthenticationError";
  }
}
