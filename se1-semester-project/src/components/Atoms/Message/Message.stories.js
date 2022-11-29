import Message from './Message'

export default {
  title: 'Atoms/Message',
  component: Message,
  argTypes: {
    color: { control: 'text' },
    children: { control: 'text' },
    type: { control: 'text' }
  }
}

const Template = args => <Message {...args} />

export const sentMessage = Template.bind({})
sentMessage.args = {
  children: 'The quick brown fox jumped over the lazy dog.',
  variant: 'sent',
  type: 'text'
}

export const receivedMessage = Template.bind({})
receivedMessage.args = {
  children: 'The quick brown fox jumped over the lazy dog.',
  variant: 'received',
  type: 'text'
}
