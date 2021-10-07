/** ユーザ取得ユースケース */
export default class UserFetchUseCase {
  /** ユーザ取得ユースケースを構築する。 */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /** ユーザ情報を取得する */
  async fetch({ userId }) {
    return await this.userRepository.fetch({ userId });
  }
}
