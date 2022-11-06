import Button from './Button'
// See also, Decorators Tutorial: https://www.youtube.com/watch?v=djmAUrfMGQs
// TODO: Extract or add options for [exit button?, icon button, drop down button (incompatible corners for different sizes)]
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

// Not compatible with size prop. If another size needed, extract to new component
/*
export const ExitButton = Template.bind({})
ExitButton.args = {
  variant: 'exit'
}
*/

// This component expects React Components as Children
export const ChatRoomOptionsButton = Template.bind({})
ChatRoomOptionsButton.args = {
  variant: 'chatroomOptions',
  size: 'm',
  children: <><span>Chat</span> <span>Color</span></>
}

export const MessageControlButton = Template.bind({})
MessageControlButton.args = {
  variant: 'messageControl',
  children: 'Text Here'
}
