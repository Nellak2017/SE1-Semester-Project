import GlobalStyle from '../design_system/globalStyles'
import { ThemeProvider } from 'styled-components'
import theme from '../design_system/theme'

function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
