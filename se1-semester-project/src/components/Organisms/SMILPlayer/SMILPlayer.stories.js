import SMILPlayer from './SMILPlayer'

export default {
  title: 'Organisms/SMILPlayer',
  component: SMILPlayer,
  argTypes: {
  }
}
const Template = args => <SMILPlayer {...args} />

const testStr1 =
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

export const smilPlayer = Template.bind({})
smilPlayer.args = {
  smil: testStr1
}
