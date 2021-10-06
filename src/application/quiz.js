/** クイズ */
export default class Quiz {
  /** クイズを構築する。 */
  constructor({ id, number, content, choices, correct }) {
    this.id = id;
    this.number = number;
    this.content = content;
    this.choices = choices;
    this.correct = correct;
  }
}

/** クイズ選択肢 */
export class QuizChoice {
  /** クイズ選択肢を構築する。 */
  constructor({ number, text }) {
    this.number = number;
    this.text = text;
  }
}

/** クイズ正解 */
export class QuizCorrect {
  /** クイズ正解を構築する。 */
  constructor({ number, text }) {
    this.number = number;
    this.text = text;
  }
}
