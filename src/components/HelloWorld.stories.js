import HelloWorld from "./HelloWorld";

export default {
  title: "Hello World",
  component: HelloWorld,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HelloWorld },
  template: `<HelloWorld v-bind="$props" />`,
});

export const HelloHironobu = Template.bind({});
HelloHironobu.args = {
  msg: "Hironobu",
};
