/** ユーザ選択 */
export default class UserChoice {
  /** ユーザ選択を構築する。 */
  constructor({ quizId, choiceNumber }) {
    this.quizId = quizId;
    this.choiceNumber = choiceNumber;
  }
}
