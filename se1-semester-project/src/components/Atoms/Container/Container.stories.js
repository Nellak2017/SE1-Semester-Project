import Container from './Container'

export default {
  title: 'Atoms/Containers/Container',
  component: Container,
  argTypes: {
    size: { control: 'text' },
    color: { control: 'text' },
    outlineSize: { control: 'text' },
    outlineColor: { control: 'text' },
    children: { control: 'text' }
  }
}

const Template = args => <Container {...args} />

export const container = Template.bind({})
container.args = {
  children: <><span>The quick brown fox</span><span>jumped over the lazy dog.</span></>,
  variant: 'outline'
}
