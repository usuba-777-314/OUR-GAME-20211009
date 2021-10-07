import UserChoice from "../application/userChoice";
import store, { StoreKey } from "./store";

/** ユーザ選択リポジトリ */
export default class UserChoiceRepository {
  /** ユーザ選択情報を読み込む。 */
  load() {
    const data = store.get(StoreKey.USER_CHOICES);
    if (data == null) return [];

    return data.map(
      ({ quizId, choiceNumber }) => new UserChoice({ quizId, choiceNumber })
    );
  }

  /** ユーザ選択情報を保存する。 */
  save({ userChoice }) {
    const { quizId, choiceNumber } = userChoice;

    const data = store.get(StoreKey.USER_CHOICES) ?? [];
    const current = data.find((d) => d.quizId === quizId);
    if (current != null) {
      current.choiceNumber = choiceNumber;
    } else {
      data.push({ quizId, choiceNumber });
    }

    store.set(StoreKey.USER_CHOICES, data);
  }

  /** ユーザ選択情報をクリアする。 */
  clear() {
    store.remove(StoreKey.USER_CHOICES);
  }
}
