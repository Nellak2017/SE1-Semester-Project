import { StrictMode } from 'react'
import ChatPage from '../components/Templates/ChatPage'
import Message from '../components/Atoms/Message/Message'
import ChatForm from '../components/Organisms/ChatForm/ChatForm'

const userName = 'Connor Keenum'

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

export default function Home () {
  return (
    <StrictMode>
      <ChatPage
        messages={messages}
        userName={userName}
        chatForm={chatForm}
        cardInfo={cardInfo}
        cardListeners={cardListeners}
      />
    </StrictMode>
  )
}
