/** ユーザ選択情報読み込みユースケース */
export default class UserChoiceLoadUseCase {
  constructor({ userChoiceRepository }) {
    this.userChoiceRepository = userChoiceRepository;
  }

  /** ユーザ選択情報を読み込む */
  async load({ userId }) {
    const userChoiceList = await this.userChoiceRepository.load({ userId });

    return userChoiceList.reduce((map, uc) => {
      map.set(uc.quizId, uc.choiceNumber);
      return map;
    }, new Map());
  }
}
