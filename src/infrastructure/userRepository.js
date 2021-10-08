import { collection, doc, getDoc, query, updateDoc } from "@firebase/firestore";
import User from "../application/user";
import db from "./db";
import observableBuilder from "./observableBuilder";

/** ユーザコンバータ */
const userConverter = {
  /** ユーザオブジェクトからFirestore用に変換する */
  toFirestore(user) {
    return {
      name: user.name,
      correctCount: user.correctCount,
    };
  },

  /** Firestoreのsnapshotからユーザオブジェクトに変換する */
  fromFirestore(snapshot, options) {
    const { name, correctCount } = snapshot.data(options);
    return new User({ name, correctCount });
  },
};

/** ユーザリファレンス */
const usersRef = collection(db, "users").withConverter(userConverter);

/** ユーザリポジトリ */
export default class UserRepository {
  /** 全てのユーザ情報を監視する。 */
  watchAll() {
    return observableBuilder.buildFromQuery(query(usersRef));
  }

  /** ユーザ情報を取得する。 */
  async fetch({ userId }) {
    const snapshot = await getDoc(doc(usersRef, userId));
    return snapshot.data();
  }

  /** 正解数を更新する。 */
  async updateCorrectCount({ userId, correctCount }) {
    await updateDoc(doc(usersRef, userId), { correctCount });
  }
}
