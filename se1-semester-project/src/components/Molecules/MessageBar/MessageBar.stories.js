import MessageBar from './MessageBar'

export default {
  title: 'Molecules/Message Bar',
  component: MessageBar,
  argTypes: {
    color: { control: 'text' },
    icon: { control: 'text' }
  }
}

const Template = args => <MessageBar {...args} />

export const messageBar = Template.bind({})
messageBar.args = {
}
