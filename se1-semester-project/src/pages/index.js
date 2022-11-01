import Player from '../components/Player'
import styled, { ThemeProvider } from 'styled-components'
import { space, color, layout, typography } from 'styled-system'
import theme from '../design_system/theme'

export default function Home () {
  return (
    <ThemeProvider theme={theme}>
      <TestComponent fontSize='large'>Hello world</TestComponent>
      <Player url='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' />
      <input placeholder='test input' />
    </ThemeProvider>
  )
}

// color: ${props => props.theme.colors.danger}
const TestComponent = styled.div`
  ${space};
  ${color};
  ${layout};
  ${typography};
`
