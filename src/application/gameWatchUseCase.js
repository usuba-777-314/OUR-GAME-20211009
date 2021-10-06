import { combineLatest, map } from "rxjs";

/** ゲーム監視ユースケース  */
export default class GameFetchUseCase {
  /** ゲーム監視ユースケースを構築する。 */
  constructor({ gameRepository, quizRepository }) {
    this.gameRepository = gameRepository;
    this.quizRepository = quizRepository;
  }

  /** ゲーム情報を取得する。 */
  watch() {
    const game = this.gameRepository.watch();
    const quizzes = this.quizRepository.watchAll();

    return combineLatest({ game, quizzes }).pipe(
      map(({ game, quizzes }) => {
        const { id, state, quizNumber } = game;
        const quiz = quizzes.find((q) => q.number === quizNumber);
        return new GameWatchOutput({ id, state, quiz });
      })
    );
  }
}

/** ゲーム情報取得結果 */
class GameWatchOutput {
  /** ゲーム情報取得結果を生成する。 */
  constructor({ id, state, quiz }) {
    this.id = id;
    this.state = state;
    this.quiz = quiz;
  }
}
