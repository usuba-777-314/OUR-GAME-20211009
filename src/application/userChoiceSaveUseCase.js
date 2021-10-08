import UserChoice from "./userChoice";
import UserChoiceLoadUseCase from "./userChoiceLoadUseCase";

/** ユーザ選択保存ユースケース */
export default class UserChoiceSaveUseCase {
  /** ユーザ選択保存ユースケース */
  constructor({ userChoiceRepository }) {
    this.userChoiceRepository = userChoiceRepository;
  }

  /** ユーザ選択を保存する */
  async save({ userId, quizId, choiceNumber }) {
    const userChoice = new UserChoice({ quizId, choiceNumber });
    await this.userChoiceRepository.save({ userId, userChoice });

    const userChoiceLoadUseCase = new UserChoiceLoadUseCase({
      userChoiceRepository: this.userChoiceRepository,
    });
    return await userChoiceLoadUseCase.load({ userId });
  }
}
