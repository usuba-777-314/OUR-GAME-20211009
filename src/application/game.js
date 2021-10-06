/** ゲーム */
export default class Game {
  /** ゲームを構築する。 */
  constructor({ id, state, quizNumber }) {
    this.id = id;
    this.state = state;
    this.quizNumber = quizNumber;
  }
}
