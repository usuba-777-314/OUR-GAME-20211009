import { interval, map, take } from "rxjs";
import gameState from "./gameState";
import GameState from "./gameState";

/** ゲームの状態を次に進めるユースケース */
export default class GameStateNextUseCase {
  /** ゲームの状態を次に進めるユースケースを構築する。 */
  constructor({ gameRepository }) {
    this.gameRepository = gameRepository;
  }

  /** ゲームの状態を次に進める。 */
  async next() {
    const game = await this.gameRepository.fetch();
    const { id } = game;

    if (game.state === GameState.WAITING) {
      await this.gameRepository.updateState({
        id,
        state: gameState.QUIZ_READING,
        quizNumber: 1,
      });
      return;
    }

    if (game.state === GameState.QUIZ_READING) {
      await this.gameRepository.updateState({
        id,
        state: gameState.QUIZ_ANSWERING,
        quizNumber: game.quizNumber,
      });
      this.startCountdown({ gameId: id });
      return;
    }

    if (game.state === GameState.QUIZ_ANSWERING) {
      await this.gameRepository.updateState({
        id,
        state: gameState.QUIZ_RESULT,
        quizNumber: game.quizNumber,
      });
      return;
    }

    if (game.state === GameState.QUIZ_RESULT) {
      if (game.quizNumber < 4) {
        await this.gameRepository.updateState({
          id,
          state: gameState.QUIZ_READING,
          quizNumber: game.quizNumber + 1,
        });
        return;
      }

      await this.gameRepository.updateState({
        id,
        state: gameState.QUIZ_FINAL_RESULT,
        quizNumber: game.quizNumber,
      });
      return;
    }

    if (game.state === GameState.QUIZ_FINAL_RESULT) {
      await this.gameRepository.updateState({
        id,
        state: gameState.WAITING,
        quizNumber: null,
      });
      return;
    }
  }

  /** カウントダウンを始める。 */
  startCountdown({ gameId: id }) {
    const initialValue = 10;

    this.gameRepository.updateRemainingTime({
      id,
      remainingTime: initialValue,
    });

    interval(1000)
      .pipe(take(initialValue))
      .pipe(map((index) => index + 1))
      .pipe(map((count) => initialValue - count))
      .subscribe((remainingTime) => {
        this.gameRepository.updateRemainingTime({ id, remainingTime });
      });
  }
}
