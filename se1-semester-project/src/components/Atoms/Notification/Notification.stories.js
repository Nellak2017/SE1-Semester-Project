import Notification from './Notification'

export default {
  title: 'Atoms/Notification/Notification',
  component: Notification,
  argTypes: {
    variant: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <Notification {...args} />

export const unread = Template.bind({})
unread.args = {
  variant: 'unread'
}

export const read = Template.bind({})
read.args = {
  variant: 'read'
}
