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

const brownFoxSMIL = 
  '<smil>' +
  '<body>' +
  '<par>' +
  '<text src="The quick brown fox jumped over the lazy dog."/>' +
  '</par>' +
  '</body>' +
  '</smil>'

  const testSMIL =
  '<smil>' +
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


const Template = args => <Message {...args} />

export const sentMessage = Template.bind({})
sentMessage.args = {
  children: brownFoxSMIL,
  variant: 'sent',
}

export const receivedMessage = Template.bind({})
receivedMessage.args = {
  children: brownFoxSMIL,
  variant: 'received',
}

export const sentSMILMessage = Template.bind({})
sentSMILMessage.args = {
  children: testSMIL,
  variant: 'sent',
}

export const recievedSMILMessage = Template.bind({})
recievedSMILMessage.args = {
  children: testSMIL,
  variant: 'received',
}