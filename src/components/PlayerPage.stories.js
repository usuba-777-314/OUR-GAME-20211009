import GameState from "../application/gameState";
import PlayerPage from "./PlayerPage";

export default {
  title: "Player Page",
  component: PlayerPage,
  parameters: {
    actions: { argTypesRegex: ".*" },
    layout: "fullscreen",
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PlayerPage },
  template: `<PlayerPage v-bind="$props" @choice="choice" />`,
});

export const Waiting = Template.bind({});
Waiting.args = {
  game: {
    state: GameState.WAITING,
    quiz: null,
  },
  user: {
    name: "井川 一二三",
  },
};

export const Reading = Template.bind({});
Reading.args = {
  game: {
    state: GameState.QUIZ_READING,
    quiz: {
      number: 1,
    },
  },
  user: {
    name: "井川 一二三",
  },
};

export const Answering = Template.bind({});
Answering.args = {
  game: {
    state: GameState.QUIZ_ANSWERING,
    quiz: {
      number: 1,
      content:
        "どこかの研究員から謎の写真が届いた。これはどのステージの一部だろうか？",
      choices: [
        {
          number: 1,
          text: "Bバスパーク",
        },
        {
          number: 2,
          text: "Bバスパーク",
        },
        {
          number: 3,
          text: "Bバスパーク",
        },
        {
          number: 4,
          text: "Bバスパーク",
        },
      ],
    },
    remainingTime: 10,
  },
  user: {
    name: "井川 一二三",
    choiceNumber: 1,
  },
};

export const RemainingTimeIsZero = Template.bind({});
RemainingTimeIsZero.args = {
  game: {
    state: GameState.QUIZ_ANSWERING,
    quiz: {
      number: 1,
      content:
        "どこかの研究員から謎の写真が届いた。これはどのステージの一部だろうか？",
      choices: [
        {
          number: 1,
          text: "Bバスパーク",
        },
        {
          number: 2,
          text: "Bバスパーク",
        },
        {
          number: 3,
          text: "Bバスパーク",
        },
        {
          number: 4,
          text: "Bバスパーク",
        },
      ],
    },
    remainingTime: 0,
  },
  user: {
    name: "井川 一二三",
    choiceNumber: 1,
  },
};

export const ResultWithCorrect = Template.bind({});
ResultWithCorrect.args = {
  game: {
    state: GameState.QUIZ_RESULT,
    quiz: {
      number: 1,
      content:
        "どこかの研究員から謎の写真が届いた。これはどのステージの一部だろうか？",
      choices: [
        {
          number: 1,
          text: "Bバスパーク",
        },
        {
          number: 2,
          text: "Bバスパーク",
        },
        {
          number: 3,
          text: "Bバスパーク",
        },
        {
          number: 4,
          text: "Bバスパーク",
        },
      ],
      correct: {
        number: 1,
        text: "スプラスコープが答えだ。大雑把なイカたちだが、部屋はきれいに片付けていることが多いそうだ。しかし、その理由は・・・「モテたい」から？",
      },
    },
  },
  user: {
    name: "井川 一二三",
    choiceNumber: 1,
  },
};

export const ResultWithIncorrect = Template.bind({});
ResultWithIncorrect.args = {
  game: {
    state: GameState.QUIZ_RESULT,
    quiz: {
      number: 1,
      content:
        "どこかの研究員から謎の写真が届いた。これはどのステージの一部だろうか？",
      choices: [
        {
          number: 1,
          text: "Bバスパーク",
        },
        {
          number: 2,
          text: "Bバスパーク",
        },
        {
          number: 3,
          text: "Bバスパーク",
        },
        {
          number: 4,
          text: "Bバスパーク",
        },
      ],
      correct: {
        number: 1,
        text: "スプラスコープが答えだ。大雑把なイカたちだが、部屋はきれいに片付けていることが多いそうだ。しかし、その理由は・・・「モテたい」から？",
      },
    },
  },
  user: {
    name: "井川 一二三",
    choiceNumber: 2,
  },
};

export const FinalResult = Template.bind({});
FinalResult.args = {
  game: {
    state: GameState.QUIZ_FINAL_RESULT,
    quiz: {
      number: 4,
      content:
        "どこかの研究員から謎の写真が届いた。これはどのステージの一部だろうか？",
      choices: [
        {
          number: 1,
          text: "Bバスパーク",
        },
        {
          number: 2,
          text: "Bバスパーク",
        },
        {
          number: 3,
          text: "Bバスパーク",
        },
        {
          number: 4,
          text: "Bバスパーク",
        },
      ],
      correct: {
        number: 1,
        text: "スプラスコープが答えだ。大雑把なイカたちだが、部屋はきれいに片付けていることが多いそうだ。しかし、その理由は・・・「モテたい」から？",
      },
    },
  },
  user: {
    name: "井川 一二三",
    choiceNumber: 2,
    correctCount: 3,
  },
};
