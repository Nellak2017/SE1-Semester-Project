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
  '<text src="1.txt" dur="10s"/>' +
  '<img src="static/media/public/woman-in-field.jpg" dur="9s"/>' +
  '<audio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" begin="5s" end="6s"/>' +
  '<video src="https://www.w3schools.com/html/mov_bbb.mp4" begin="3s"/>' +
  '</par>' +
  '<video src="https://www.w3schools.com/html/mov_bbb.mp4" begin="1s"/>' +
  '</body>' +
  '</smil>'

export const smilPlayer = Template.bind({})
smilPlayer.args = {
  smil: testStr1

}
