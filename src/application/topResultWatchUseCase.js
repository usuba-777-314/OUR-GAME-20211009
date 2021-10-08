import { map } from "rxjs";

/** 最優秀者情報監視ユースケース */
export default class TopResultWatchUseCase {
  /** 最優秀者情報監視ユースケースを構築する。 */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /** 最優秀者情報を監視する。 */
  watch() {
    return this.userRepository.watchAll().pipe(
      map((allUsers) => {
        const correctCounts = allUsers
          .map((u) => u.correctCount)
          .filter((c) => c != null);
        const correctCount = Math.max(...correctCounts);
        const users = allUsers.filter((u) => u.correctCount === correctCount);
        return new TopResultWatchOutput({ correctCount, users });
      })
    );
  }
}

/** 最優秀者情報監視結果 */
class TopResultWatchOutput {
  constructor({ correctCount, users }) {
    this.correctCount = correctCount;
    this.users = users;
  }
}
