import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
} from "@firebase/firestore";
import { map } from "rxjs";
import Game from "../application/game";
import db from "./db";
import observableBuilder from "./observableBuilder";

/** ゲームコンバータ */
const gameConverter = {
  /** ゲームオブジェクトからFirestore用に変換する */
  toFirestore(game) {
    return {
      state: game.state,
      quizNumber: game.quizNumber,
      remainingTime: game.remainingTime,
    };
  },

  /** Firestoreのsnapshotからゲームオブジェクトに変換する */
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const { state, quizNumber, remainingTime } = snapshot.data(options);
    return new Game({ id, state, quizNumber, remainingTime });
  },
};

/** ゲームリファレンス */
const gamesRef = collection(db, "games").withConverter(gameConverter);

/** ゲームリポジトリ */
export default class GameRepository {
  /** ゲームを監視する。 */
  watch() {
    return observableBuilder
      .buildFromQuery(query(gamesRef))
      .pipe(map((games) => games[0]));
  }

  /** ゲームを取得する。 */
  async fetch() {
    const snapshot = await getDocs(query(gamesRef));
    return snapshot.docs[0]?.data();
  }

  /** ゲームの状態を更新する。 */
  async updateState({ id, state, quizNumber }) {
    await updateDoc(doc(gamesRef, id), {
      state,
      quizNumber,
      remainingTime: null,
    });
  }

  /** ゲームの残り時間を更新する。 */
  async updateRemainingTime({ id, remainingTime }) {
    await updateDoc(doc(gamesRef, id), { remainingTime });
  }
}
