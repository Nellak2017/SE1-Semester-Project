import ChatForm from './ChatForm'

export default {
  title: 'Organisms/Chat Form',
  component: ChatForm,
  argTypes: {
  }
}
const Template = args => <ChatForm {...args} />

export const chatForm = Template.bind({})
chatForm.args = {
}
