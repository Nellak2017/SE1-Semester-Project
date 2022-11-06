import { css } from 'styled-components'
// TODO: use this: https://github.com/styled-system/styled-system/issues/1798
// Add variants or size or kind pre-sets, then when you need to alter hover, get that css in the hover
//    based on the prop passed in

// see also: https://vaadin.com/docs/latest/styling/lumo/design-tokens/elevation#:~:text=Elevation%20is%20used%20to%20indicate,are%20applied%20using%20box%2Dshadow.
// see also: https://m3.material.io/styles/elevation/tokens
// see also: https://stackoverflow.com/questions/30533055/calculating-shadow-values-for-all-material-design-elevations
const elevations = [
  '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  '0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
  '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
  '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
  '0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)']
elevations.extraSmall = elevations[0] // 1dp : elements closest to application background, like cards
elevations.small = elevations[1] // 3dp : tooltips, banners, elevated buttons, FAB
elevations.medium = elevations[2] // 6dp : contextual overlays for components, Menu, Dropdown, Nav bar
elevations.large = elevations[3] // 8dp : element that rise above most, like dialouges, time picker, search bar
elevations.extraLarge = elevations[4] // 12dp : elements highest in stacking order, like notifications

const insets = [
  '1px 1px 5px rgba(1, 1, 0, 0.7) inset'
]
insets.normal = insets[0] // completely guessed

// see also: https://zaat.dev/blog/building-a-design-system-in-react-with-styled-components/
const fontSizes = ['10px', '12px', '14px', '16px', '24px', '40px', '64px']
fontSizes.extraSmall = fontSizes[0]
fontSizes.smaller = fontSizes[1]
fontSizes.small = fontSizes[2]
fontSizes.medium = fontSizes[3]
fontSizes.large = fontSizes[4]
fontSizes.larger = fontSizes[5]
fontSizes.extraLarge = fontSizes[6]

const breakpoints = ['600px', '900px', '1200px', '1800px']
breakpoints.sm = breakpoints[0] // phones
breakpoints.md = breakpoints[1] // ipads
breakpoints.lg = breakpoints[2] // laptops
breakpoints.xl = breakpoints[3] // desktops

const spaces = ['4px', '8px', '16px', '32px', '48px', '56px']
spaces.smaller = spaces[0]
spaces.small = spaces[1]
spaces.medium = spaces[2]
spaces.large = spaces[3]
spaces.larger = spaces[4]
spaces.extraLarge = spaces[5]

// Pre-sets for variants, colors, sizes, outlines, elevations, media queries of different components

export const buttonPreSets = {
  variant: {
    pill: css``,
    newChat: css`
      &:active { // guessed value
        box-shadow: ${props => props.theme.insets.normal};
      }
    `,
    save: css`
      // --- Set a Default Size for save. Override with size prop ---
      padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.medium}; // default size
      font-size: ${props => props.theme.fontSizes.smaller}; // default size
      // ------
      &:active { // guessed value
        box-shadow: ${props => props.theme.insets.normal};
      }
    `
  },
  size: {
    xs: css`
      padding: ${props => props.theme.spaces.smaller} ${props => props.theme.spaces.small};
      font-size: ${props => props.theme.fontSizes.extraSmall};
    `,
    s: css`
      padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.medium};
      font-size: ${props => props.theme.fontSizes.smaller};
    `,
    m: css`
      padding: ${props => props.theme.spaces.medium} ${props => props.theme.spaces.large};
      font-size: ${props => props.theme.fontSizes.medium};
    `,
    l: css`
      padding: ${props => props.theme.spaces.large} ${props => props.theme.spaces.larger};
      font-size: ${props => props.theme.fontSizes.large};
    `,
    xl: css`
      padding: ${props => props.theme.spaces.larger} ${props => props.theme.spaces.extraLarge};
      font-size: ${props => props.theme.fontSizes.larger};
    `
  },
  color: {
    primary: css`
      color: ${props => props.theme.colors.primaryLight};
      background-color: ${props => props.theme.colors.primary};
      &:hover {
        background-color: ${props => props.theme.colors.primaryHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.primaryActive};
      }
    `,
    darkNeutral: css`
      color: ${props => props.theme.colors.darkNeutralLight};
      background-color: ${props => props.theme.colors.darkNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.darkNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.darkNeutralActive};
      }
    `,
    lightNeutral: css`
      color: ${props => props.theme.colors.lightNeutralLight};
      background-color: ${props => props.theme.colors.lightNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive};
      }
    `,
    danger: css`
      color: ${props => props.theme.colors.dangerLight};
      background-color: ${props => props.theme.colors.danger};
      &:hover {
        background-color: ${props => props.theme.colors.dangerHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.dangerActive};
      }
    `,
    success: css`
      color: ${props => props.theme.colors.successLight};
      background-color: ${props => props.theme.colors.success};
      &:hover {
        background-color: ${props => props.theme.colors.successHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.successActive};
      }
    `,
    warning: css`
      color: ${props => props.theme.colors.warningLight};
      background-color: ${props => props.theme.colors.warning};
      &:hover {
        background-color: ${props => props.theme.colors.warningHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.warningActive};
      }
    `
  }
}

// Pre-set Getter function
// see also: https://github.com/styled-system/styled-system/issues/1798
// see also: https://stackoverflow.com/questions/63663554/approach-to-creating-variants-with-styled-components
export const getPresetCSS = (preSets, preSetProp) => (props) => {
  return preSets[preSetProp][props[preSetProp]]
}

// body and defaultFontColor are redundant and only there for understandability
export default {
  colors: {
    primaryLight: '#f4f0ff',
    primaryLightHover: '#eee8ff',
    primaryLightActive: '#ddd0ff',
    primary: '#9068fe',
    primaryHover: '#825ee5',
    primaryActive: '#7353cb',
    primaryDark: '#6c4ebf',
    primaryDarkHover: '#563e98',
    primaryDarkActive: '#412f72',
    primaryDarker: '#322459',
    darkNeutralLight: '#ebeaeb',
    darkNeutralLightHover: '#e1e0e1',
    darkNeutralLightActive: '#c2bfc2',
    darkNeutral: '#39313a',
    darkNeutralHover: '#332c34',
    darkNeutralActive: '#2e272e',
    darkNeutralDark: '#2b252c',
    darkNeutralDarkHover: '#221d23',
    darkNeutralDarkActive: '#1a161a',
    darkNeutralDarker: '#141114',
    lightNeutralLight: '#eeedee',
    lightNeutralLightHover: '#e5e3e5',
    lightNeutralLightActive: '#c9c6c9',
    lightNeutral: '#504651',
    lightNeutralHover: '#483f49',
    lightNeutralActive: '#403841',
    lightNeutralDark: '#3c353d',
    lightNeutralDarkHover: '#302a31',
    lightNeutralDarkActive: '#241f24',
    lightNeutralDarker: '#1c191c',
    dangerLight: '#fbecec',
    dangerLightHover: '#f9becec',
    dangerLightActive: '#f2c5c5',
    danger: '#d64444',
    dangerHover: '#c13d3d',
    dangerActive: '#ab3636',
    dangerDark: '#a13333',
    dangerDarkHover: '#802929',
    dangerDarkActive: '#601f1f',
    dangerDarker: '#4b1818',
    successLight: '#f2fcf1',
    successLightHover: '#ecfaea',
    successLightActive: '#d8f5d3',
    success: '#80de71',
    successHover: '#73c866',
    successActive: '#66b25a',
    successDark: '#60a755',
    successDarkHover: '#4d8544',
    successDarkActive: '#3a6433',
    successDarker: '#2d4e28',
    warningLight: '#fdf8f2',
    warningLightHover: '#fcf5eb',
    warningLightActive: '#f8ead5',
    warning: '#e8bb79',
    warningHover: '#d1a86d',
    warningActive: '#ba9661',
    warningDark: '#ae8c5b',
    warningDarkHover: '#8b7049',
    warningDarkActive: '#685436',
    warningDarker: '#51412a',
    body: '#39313a',
    defaultFontColor: '#f4f0ff'
  },
  fontSizes,
  breakpoints,
  spaces,
  elevations,
  insets
}
