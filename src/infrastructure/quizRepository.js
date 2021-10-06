import { collection, query } from "@firebase/firestore";
import Quiz, { QuizChoice, QuizCorrect } from "../application/quiz";
import db from "./db";
import observableBuilder from "./observableBuilder";

/** クイズコンバータ */
const quizConverter = {
  /** クイズオブジェクトからFirestore用に変換する */
  toFirestore(quiz) {
    return {
      number: quiz.number,
      content: quiz.content,
      choices: quiz.choices.map(({ number, text }) => ({ number, text })),
      correct: {
        number: quiz.correct.number,
        text: quiz.correct.text,
      },
    };
  },

  /** Firestoreのsnapshotからクイズオブジェクトに変換する */
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    const { number, content } = data;
    const choices = data.choices.map(
      ({ number, text }) => new QuizChoice({ number, text })
    );
    const correct = new QuizCorrect({
      number: data.correct.number,
      text: data.correct.text,
    });

    return new Quiz({ id, number, content, choices, correct });
  },
};

/** クイズリファレンス */
const quizzesRef = collection(db, "quizzes").withConverter(quizConverter);

/** クイズリポジトリ */
export default class QuizRepository {
  /** 全てのクイズ情報を監視する。 */
  watchAll() {
    return observableBuilder.buildFromQuery(query(quizzesRef));
  }
}
