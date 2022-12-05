import TextDurPopup from './TextDurPopup'

export default {
  title: 'Molecules/Text Popups/Text Duration Popup',
  component: TextDurPopup,
  argTypes: {
  }
}

const Template = args => <TextDurPopup {...args} />

export const textDurationPopup = Template.bind({})
textDurationPopup.args = {
  listener: ({ begin, end, dur }) => { console.log(begin) }
}
