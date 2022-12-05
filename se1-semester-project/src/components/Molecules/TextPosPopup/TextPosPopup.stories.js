import TextPosPopup from './TextPosPopup'

export default {
  title: 'Molecules/Text Popups/Text Position Popup',
  component: TextPosPopup,
  argTypes: {
  }
}

const Template = args => <TextPosPopup {...args} />

export const textPositionPopup = Template.bind({})
textPositionPopup.args = {
  options: ['Top', 'Middle', 'Bottom'],
  listeners: [() => console.log('hello from top'), () => console.log('hello from mid'), () => console.log('hello from bottom')]
}
