import CloseRightBar from './CloseRightBar'

export default {
  title: 'Molecules/Close Right Bar',
  component: CloseRightBar,
  argTypes: {
    variant: { control: 'text' },
    color: { control: 'text' },
    leftComponent: { control: 'text' }
  }
}

const Template = args => <CloseRightBar {...args} />

export const closeRightBarOpen = Template.bind({})
closeRightBarOpen.args = {
  variant: 'open'
}

export const closeRightBarClosed = Template.bind({})
closeRightBarClosed.args = {
  variant: 'closed'
}
