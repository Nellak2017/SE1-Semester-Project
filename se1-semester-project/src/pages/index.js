import Player from '../components/Player'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../design_system/theme'

export default function Home () {
  return (
    <ThemeProvider theme={theme}>
      <TestComponent color='primary'>Hello world</TestComponent>
      <Player url='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' />
    </ThemeProvider>
  )
}

const TestComponent = styled.div`
  color: ${props => props.theme.colors.danger}
`
