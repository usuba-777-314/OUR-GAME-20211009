/** ユーザ */
export default class User {
  /** ユーザを構築する */
  constructor({ name, correctCount }) {
    this.name = name;
    this.correctCount = correctCount;
  }
}
