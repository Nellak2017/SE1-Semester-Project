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

// Map Messages from Data in the Index file OR modify MessageContainer to do it automatically
const brownFoxSMIL = '<smil>' +
  '<body>' +
  '<par>' +
  '<text src="The quick brown fox jumped over the lazy dog."/>' +
  '</par>' +
  '</body>' +
  '</smil>'

const testSMIL = '<smil>' +
  '<body>' +
  '<par>' +
  '<text src="The Quick Brown Fox Jumped Over the Lazy Dog." dur="10s"/>' +
  '<audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" begin="5s" end="6s"/>' +
  '<video src="https://www.w3schools.com/html/mov_bbb.mp4" begin="0s" end="5s"/>' +
  '<img src="static/media/public/woman-in-field.jpg" begin="5s" end="10s"/>' +
  '</par>' +
  '<video src="https://www.w3schools.com/html/mov_bbb.mp4" begin="1s"/>' +
  '</body>' +
  '</smil>'


const messages = [
  {variant:'received', message: brownFoxSMIL},
  {variant:'sent', message: brownFoxSMIL},
  {variant:'received', message: brownFoxSMIL},
  {variant:'received', message: testSMIL},

  {variant:'sent', message: brownFoxSMIL},
  {variant:'received', message: testSMIL},
  {variant:'sent', message: brownFoxSMIL},
  {variant:'received', message: testSMIL},
  {variant:'sent', message: brownFoxSMIL},
  {variant:'received', message: testSMIL},
  {variant:'sent', message: brownFoxSMIL},
  {variant:'received', message: testSMIL},

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
