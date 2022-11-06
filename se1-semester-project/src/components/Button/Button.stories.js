import Button from './Button'
// See also, Decorators Tutorial: https://www.youtube.com/watch?v=djmAUrfMGQs
export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'text' },
    onClick: { action: 'demonstrates basic usage of onClick' }
  }
}

const Template = args => <Button {...args} />

export const PillButton = Template.bind({})
PillButton.args = {
  variant: 'pill',
  children: 'default'
}

export const NewChatButton = Template.bind({})
NewChatButton.args = {
  variant: 'newChat',
  size: 'm',
  children: 'Default'
}

export const SaveButton = Template.bind({})
SaveButton.args = {
  variant: 'save',
  children: 'Default'
}
