import MessageContainer from './MessageContainer'
import Message from '../../Atoms/Message/Message'
import ChatForm from '../ChatForm/ChatForm'

export default {
  title: 'Organisms/Message Container',
  component: MessageContainer,
  argTypes: {
    userName: { control: 'text' },
    messages: { control: 'text' }
  }
}
const Template = args => <MessageContainer {...args} />

const theMessages = [
  <Message key='msg1' variant='received' type='text'>The trailer just launched! </Message>,
  <Message key='msg2' variant='sent' type='text'>No, I think that's next week.</Message>,
  <Message key='msg3' variant='received' type='text'>Explain this.</Message>,
  <Message key='msg4' variant='received' type='smil' />,

  <Message key='msg5' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg4' variant='received' type='smil' />,
  <Message key='msg5' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg4' variant='received' type='smil' />,
  <Message key='msg5' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg4' variant='received' type='smil' />,
  <Message key='msg5' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg4' variant='received' type='smil' />

]

export const messageContainer = Template.bind({})
messageContainer.args = {
  userName: 'Alice Hatter',
  messages: theMessages,
  chatForm: <ChatForm />
}
