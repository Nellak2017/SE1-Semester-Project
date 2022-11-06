import { addDecorator } from '@storybook/react'
import theme from '../src/design_system/theme'
import GlobalStyle from '../src/design_system/globalStyles'
import { ThemeProvider } from 'styled-components'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
// Wrap every story in the story book with a ThemeProvider and the GlobalStyles
addDecorator(story => <ThemeProvider theme={theme}><GlobalStyle />{story()}</ThemeProvider>)