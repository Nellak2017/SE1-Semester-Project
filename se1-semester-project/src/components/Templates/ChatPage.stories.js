import ChatPage from './ChatPage'

export default {
  title: 'Templates/Chat Page',
  component: ChatPage,
  argTypes: {
  }
}
const Template = args => <ChatPage {...args} />

export const theChatPage = Template.bind({})
theChatPage.args = {
}
