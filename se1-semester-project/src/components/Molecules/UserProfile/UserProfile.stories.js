import UserProfile from './UserProfile'

export default {
  title: 'Molecules/User Profile',
  component: UserProfile,
  argTypes: {
    size: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' }
  }
}

const Template = args => <UserProfile {...args} />

export const userProfile = Template.bind({})
userProfile.args = {
  name: 'MyselfMyselfMyselfMyselfMyselfMyselfMyselfMyselfMyselfMyselfMyselfMyself',
  alt: 'read image placeholder'
}
