import ChatPage from './ChatPage'
import Message from '../Atoms/Message/Message'
import ChatForm from '../Organisms/ChatForm/ChatForm'

export default {
  title: 'Templates/Chat Page',
  component: ChatPage,
  argTypes: {
  }
}
const Template = args => <ChatPage {...args} />

const userName = 'Alice Hatter'

const messages = [
  <Message key='msg1' variant='received' type='text'>The trailer just launched! </Message>,
  <Message key='msg2' variant='sent' type='text'>No, I think that's next week.</Message>,
  <Message key='msg3' variant='received' type='text'>Explain this.</Message>,
  <Message key='msg4' variant='received' type='smil' />,

  <Message key='msg5' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg6' variant='received' type='smil' />,
  <Message key='msg7' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg8' variant='received' type='smil' />,
  <Message key='msg9' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg10' variant='received' type='smil' />,
  <Message key='msg11' variant='sent' type='text'>They launched early !!?</Message>,
  <Message key='msg12' variant='received' type='smil' />

]

const chatForm = <ChatForm />

const listen = () => console.log('I am a card and I was clicked')

const cardListeners = [listen, listen, listen, listen, listen]

// @TODO: Add src for placeholder in storybook
// import Placeholder from '../../../../public/card-placeholder.jpg'
const cardInfo = [
  {
    chatId: 0,
    chatOwner: 'John Constantine',
    chatName: 'John Constantine, Connor Keenum',
    lastText: 'We ougt to play tarot sometime.'
  },
  {
    chatId: 1,
    chatOwner: 'Emily Valerez',
    chatName: 'Emily Valerez, Connor Keenum',
    lastText: 'I had fun last night ;p.'
  },
  {
    chatId: 2,
    chatOwner: 'Connor Keenum',
    chatName: 'Camille Harris, Connor Keenum',
    lastText: 'Thank you for your support lately.'
  },
  {
    chatId: 3,
    chatOwner: 'Connor Keenum',
    chatName: 'Lonnie Amara, Connor Keenum',
    lastText: 'How was the date?'
  }
]

export const theChatPage = Template.bind({})
theChatPage.args = {
  messages,
  userName,
  chatForm,
  cardInfo,
  cardListeners
}
