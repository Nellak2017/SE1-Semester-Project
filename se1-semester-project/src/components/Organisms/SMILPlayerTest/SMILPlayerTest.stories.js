import SMILPlayerTest from './SMILPlayerTest'

export default {
  title: 'Organisms/SMIL Player Test',
  component: SMILPlayerTest,
  argTypes: {
  }
}
const Template = args => <SMILPlayerTest {...args} />

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

export const smilPlayerTest = Template.bind({})
smilPlayerTest.args = {
  smil: testStr1
}
