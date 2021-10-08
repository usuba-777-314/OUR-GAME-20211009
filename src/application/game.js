/** ゲーム */
export default class Game {
  /** ゲームを構築する。 */
  constructor({ id, state, quizNumber, remainingTime }) {
    this.id = id;
    this.state = state;
    this.quizNumber = quizNumber;
    this.remainingTime = remainingTime;
  }
}
