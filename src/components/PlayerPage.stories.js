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
    state: 1,
    quiz: null,
  },
  user: {},
};

export const Reading = Template.bind({});
Reading.args = {
  game: {
    state: 2,
    quiz: {
      number: 1,
    },
  },
  user: {},
};

export const Answering = Template.bind({});
Answering.args = {
  game: {
    state: 3,
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
  },
  user: {
    choiceNumber: 1,
  },
};
