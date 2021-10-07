import UserChoiceLoadUseCase from "./userChoiceLoadUseCase";

/** ユーザ選択クリアユースケース */
export default class UserChoiceClearUseCase {
  /** ユーザ選択クリアユースケースを構築する。 */
  constructor({ userChoiceRepository }) {
    this.userChoiceRepository = userChoiceRepository;
  }

  /** ユーザ選択をクリアする */
  async clear({ userId }) {
    await this.userChoiceRepository.clear({ userId });

    const userChoiceLoadUseCase = new UserChoiceLoadUseCase({
      userChoiceRepository: this.userChoiceRepository,
    });
    return await userChoiceLoadUseCase.load({ userId });
  }
}
