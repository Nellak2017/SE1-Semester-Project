import SearchInput from './SearchInput'

export default {
  title: 'Atoms/Input/SearchInput',
  component: SearchInput,
  argTypes: {
    variant: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <SearchInput {...args} />

export const defaultInput = Template.bind({})
defaultInput.args = {
  variant: 'default'
}
