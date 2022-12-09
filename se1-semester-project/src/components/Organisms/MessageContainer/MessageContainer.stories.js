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

export const messageContainer = Template.bind({})
messageContainer.args = {
  userName: 'Alice Hatter',
  messages,
  chatForm: <ChatForm />
}
