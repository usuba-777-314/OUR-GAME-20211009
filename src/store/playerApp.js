import CorrectCountCalculateUseCase from "../application/correctCountCalculateUseCase";
import GameWatchUseCase from "../application/gameWatchUseCase";
import UserChoiceClearUseCase from "../application/userChoiceClearUseCase";
import UserChoiceLoadUseCase from "../application/userChoiceLoadUseCase";
import UserChoiceSaveUseCase from "../application/userChoiceSaveUseCase";
import UserFetchUseCase from "../application/userFetchUseCase";
import GameState from "../application/gameState";

export const state = {
  /** ゲームリポジトリ */
  gameRepository: null,
  /** クイズリポジトリ */
  quizRepository: null,
  /** ユーザ選択リポジトリ */
  userChoiceRepository: null,
  /** ユーザリポジトリ */
  userRepository: null,
  /** ユーザID */
  userId: null,
  /** ユーザ */
  user: null,
  /** ゲーム */
  game: null,
  /** ユーザ選択 */
  userChoices: null,
};

export const getters = {
  /** ゲーム */
  game({ game }) {
    return game;
  },
  /** ユーザ */
  user({ user, game, userChoices }) {
    const { id, name, correctCount } = user;

    return {
      id,
      name,
      correctCount,
      choiceNumber: userChoices.get(game.quiz?.id),
    };
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
  /** ユーザ選択リポジトリを設定 */
  userChoiceRepository(state, { userChoiceRepository }) {
    state.userChoiceRepository = userChoiceRepository;
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
  /** ユーザ選択を設定 */
  userChoices(state, { userChoices }) {
    state.userChoices = userChoices;
  },
};

export const actions = {
  /** リポジトリを設定する */
  setRepositories(
    { commit },
    { gameRepository, quizRepository, userChoiceRepository, userRepository }
  ) {
    commit("gameRepository", { gameRepository });
    commit("quizRepository", { quizRepository });
    commit("userChoiceRepository", { userChoiceRepository });
    commit("userRepository", { userRepository });
  },

  /** 初期化する。 */
  async setup({ commit, dispatch }, { userId }) {
    commit("userId", { userId });
    dispatch("initializeState");
    await dispatch("authentication");
    await Promise.all([dispatch("watchGame"), dispatch("loadUserChoices")]);
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

    const userChoices = new Map();
    commit("userChoices", { userChoices });
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
  watchGame({ state, commit, dispatch }) {
    const { gameRepository, quizRepository } = state;

    const gameWatchUseCase = new GameWatchUseCase({
      gameRepository,
      quizRepository,
    });

    gameWatchUseCase.watch().subscribe((game) => {
      commit("game", { game });

      dispatch("clearUserChoicesIfNeeded");
      dispatch("calculateCorrectCountIfNeeded");
    });
  },

  /** ユーザ選択を読み込む。 */
  async loadUserChoices({ state, commit }) {
    const { userChoiceRepository, userId } = state;

    const userChoiceLoadUseCase = new UserChoiceLoadUseCase({
      userChoiceRepository,
    });
    const userChoices = await userChoiceLoadUseCase.load({ userId });
    commit("userChoices", { userChoices });
  },

  /** 解答を選択する。 */
  async choiceAnswer({ state, commit }, { choiceNumber }) {
    const { userChoiceRepository, userId, game } = state;
    const { id: quizId } = game.quiz;

    const userChoiceSaveUseCase = new UserChoiceSaveUseCase({
      userChoiceRepository,
    });
    const userChoices = await userChoiceSaveUseCase.save({
      userId,
      quizId,
      choiceNumber,
    });
    commit("userChoices", { userChoices });
  },

  /** 必要があれば、ユーザ選択をクリアする。 */
  async clearUserChoicesIfNeeded({ state, dispatch }) {
    const { game } = state;

    const isStart =
      game.state === GameState.WAITING ||
      (game.state === GameState.QUIZ_READING && game.quiz.number === 1);
    if (!isStart) return;

    await dispatch("clearUserChoices");
  },

  /** ユーザ選択をクリアする。 */
  async clearUserChoices({ state, commit }) {
    const { userChoiceRepository, userId } = state;

    const userChoiceClearUseCase = new UserChoiceClearUseCase({
      userChoiceRepository,
    });
    const userChoices = await userChoiceClearUseCase.clear({ userId });
    commit("userChoices", { userChoices });
  },

  /** 必要があれば、正解数を計算する。 */
  async calculateCorrectCountIfNeeded({ state, dispatch }) {
    const { game } = state;

    const ended =
      game.state === GameState.QUIZ_FINAL_RESULT ||
      (game.state === GameState.QUIZ_RESULT && game.quiz.number === 4);
    if (!ended) return;

    await dispatch("calculateCorrectCount");
  },

  /** 正解数を計算する。 */
  async calculateCorrectCount({ state, commit }) {
    const { quizRepository, userChoiceRepository, userRepository, userId } =
      state;

    const correctCountCalculateUseCase = new CorrectCountCalculateUseCase({
      quizRepository,
      userChoiceRepository,
      userRepository,
    });

    const needsCalculate = await correctCountCalculateUseCase.needsCalculate({
      userId,
    });
    if (!needsCalculate) return;

    const user = await correctCountCalculateUseCase.calculate({ userId });
    commit("user", { user });
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
