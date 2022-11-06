import React from 'react'
import PillButton from './PillButton'
import { ThemeProvider } from 'styled-components'
import theme from '../../design_system/theme'
import GlobalStyle from '../../design_system/globalStyles'

// TODO: Adhere to DRY Principle and stop re-making themeprovider & globals for each.. Look into storybook plugins?
// TODO: Get Poppins font for

export default {
  title: 'PillButton',
  component: PillButton
}

export const DefaultPillButton = () =>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <PillButton>Default</PillButton>
  </ThemeProvider>

export const SmallPillButton = () =>
  <ThemeProvider theme={theme}>

    <PillButton variant='newChat' size='s' color='primary'>Small</PillButton>
  </ThemeProvider>
