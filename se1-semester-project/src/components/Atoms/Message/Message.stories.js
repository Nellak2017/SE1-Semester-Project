import Message from './Message'

export default {
  title: 'Atoms/Message/Message',
  component: Message,
  argTypes: {
    color: { control: 'text' },
    children: { control: 'text' }
  }
}

const Template = args => <Message {...args} />

export const sentMessage = Template.bind({})
sentMessage.args = {
  children: 'The quick brown fox jumped over the lazy dog.',
  variant: 'sent'
}

export const receivedMessage = Template.bind({})
receivedMessage.args = {
  children: 'The quick brown fox jumped over the lazy dog.',
  variant: 'received'
}
