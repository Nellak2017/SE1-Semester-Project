import CreateChatForm from './CreateChatForm'

export default {
  title: 'Organisms/Create Chat Form',
  component: CreateChatForm,
  argTypes: {
    maxUsers: { controls: 'string' },
    initialValue: { controls: 'string' }
  }
}
const Template = args => <CreateChatForm {...args} />

export const createChatForm = Template.bind({})
createChatForm.args = {
  maxUsers: 5,
  initialValue: ''
}
