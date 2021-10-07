/** 正解数計算ユースケース */
export default class CorrectCountCalculateUseCase {
  /** 正解数計算ユースケース */
  constructor({ quizRepository, userChoiceRepository, userRepository }) {
    this.quizRepository = quizRepository;
    this.userChoiceRepository = userChoiceRepository;
    this.userRepository = userRepository;
  }

  /** 計算する必要があるか。 */
  async needsCalculate({ userId }) {
    return await this.userChoiceRepository.hasUserChoices({ userId });
  }

  /** 計算する。 */
  async calculate({ userId }) {
    const userChoices = await this.userChoiceRepository.load({ userId });
    const quizzes = await this.quizRepository.queryAll();

    const correctFilter = (uc) =>
      uc.choiceNumber === findQuiz(uc.quizId)?.correct.number;
    const findQuiz = (id) => quizzes.find((q) => q.id === id);
    const correctCount = userChoices.filter(correctFilter).length;

    await this.userRepository.updateCorrectCount({ userId, correctCount });

    return this.userRepository.fetch({ userId });
  }
}
