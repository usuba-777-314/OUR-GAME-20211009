import { collection, doc, getDoc } from "@firebase/firestore";
import User from "../application/user";
import db from "./db";

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
  /** ユーザ情報を取得する。 */
  async fetch({ userId }) {
    const snapshot = await getDoc(doc(usersRef, userId));
    return snapshot.data();
  }
}
