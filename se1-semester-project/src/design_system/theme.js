import { css } from 'styled-components'
// TODO: Factor out re-used attributes inside of the pre-sets so you can apply DRY principle. Ex: Color is re-used alot, so factor it out.

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

const colorPreset = {
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
  `,
  transparent: css`
    color: #fff;
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
    &:active {
      background-color: transparent;
    }
  `
}

// see also: https://stackoverflow.com/questions/45852991/concat-prop-value-with-string-in-styled-component
const transparentColorPreset = {
  transparentPrimary: css`
    background-color: ${props => props.theme.colors.primaryLight}00; // bg is initially transparent
    &:hover {
      background-color: ${props => props.theme.colors.primaryHover}20; // then 20% on hover and active
    }
    &:active {
      background-color: ${props => props.theme.colors.primaryActive}20;
    }
  `,
  transparentDarkNeutral: css`
    background-color: ${props => props.theme.colors.darkNeutral}00;
    &:hover {
      background-color: ${props => props.theme.colors.darkNeutralHover}20;
    }
    &:active {
      background-color: ${props => props.theme.colors.darkNeutralActive}20;
    }
  `,
  transparentLightNeutral: css`
    background-color: ${props => props.theme.colors.lightNeutral}00;
    &:hover {
      background-color: ${props => props.theme.colors.lightNeutralHover}20;
    }
    &:active {
      background-color: ${props => props.theme.colors.lightNeutralActive}20;
    }
  `,
  transparentDanger: css`
    background-color: ${props => props.theme.colors.danger}00;
    &:hover {
      background-color: ${props => props.theme.colors.dangerHover}20;
    }
    &:active {
      background-color: ${props => props.theme.colors.dangerActive}20;
    }
  `,
  transparentSuccess: css`
    background-color: ${props => props.theme.colors.success}00;
    &:hover {
      background-color: ${props => props.theme.colors.successHover}20;
    }
    &:active {
      background-color: ${props => props.theme.colors.successActive}20;
    }
  `,
  transparentWarning: css`
    background-color: ${props => props.theme.colors.warning}00;
    &:hover {
      background-color: ${props => props.theme.colors.warningHover}20;
    }
    &:active {
      background-color: ${props => props.theme.colors.warningActive}20;
    }
  `,
  primary: css`
      background-color: ${props => props.theme.colors.primary};
      &:hover {
        background-color: ${props => props.theme.colors.primaryHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.primaryActive};
      }
    `,
  darkNeutral: css`
      background-color: ${props => props.theme.colors.darkNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.darkNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.darkNeutralActive};
      }
    `,
  lightNeutral: css`
      background-color: ${props => props.theme.colors.lightNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive};
      }
    `,
  danger: css`
      background-color: ${props => props.theme.colors.danger};
      &:hover {
        background-color: ${props => props.theme.colors.dangerHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.dangerActive};
      }
    `,
  success: css`
      background-color: ${props => props.theme.colors.success};
      &:hover {
        background-color: ${props => props.theme.colors.successHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.successActive};
      }
    `,
  warning: css`
      background-color: ${props => props.theme.colors.warning};
      &:hover {
        background-color: ${props => props.theme.colors.warningHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.warningActive};
      }
    `
}

const outlineSizePreset = {
  xs: css`
    outline-width: 1px;
  `,
  s: css`
    outline-width: 2px;
  `,
  m: css`
    outline-width: 4px;
  `,
  l: css`
    outline-width: 8px;
  `,
  xl: css`
    outline-width: 16px;
  `
}

const outlineColorPreset = {
  primaryLight: css`
    outline-color: ${props => props.theme.colors.primaryLight};
  `,
  primary: css`
    outline-color: ${props => props.theme.colors.primary};
  `,
  primaryDark: css`
    outline-color: ${props => props.theme.colors.primaryDark};
  `,
  primaryDarker: css`
    outline-color: ${props => props.theme.colors.primaryDarker};
  `,
  darkNeutralLight: css`
    outline-color: ${props => props.theme.colors.darkNeutralLight};
  `,
  darkNeutral: css`
    outline-color: ${props => props.theme.colors.darkNeutral};
  `,
  darkNeutralDark: css`
    outline-color: ${props => props.theme.colors.darkNeutralDark};
  `,
  darkNeutralDarker: css`
    outline-color: ${props => props.theme.colors.darkNeutralDarker};
  `,
  lightNeutralLight: css`
    outline-color: ${props => props.theme.colors.lightNeutralLight};
  `,
  lightNeutral: css`
    outline-color: ${props => props.theme.colors.lightNeutral};
  `,
  lightNeutralDark: css`
    outline-color: ${props => props.theme.colors.lightNeutralDark};
  `,
  lightNeutralDarker: css`
    outline-color: ${props => props.theme.colors.lightNeutralDarker};
  `,
  dangerLight: css`
    outline-color: ${props => props.theme.colors.dangerLight};
  `,
  danger: css`
    outline-color: ${props => props.theme.colors.danger};
  `,
  dangerDark: css`
    outline-color: ${props => props.theme.colors.dangerDark};
  `,
  dangerDarker: css`
    outline-color: ${props => props.theme.colors.dangerDarker};
  `,
  successLight: css`
    outline-color: ${props => props.theme.colors.successLight};
  `,
  success: css`
    outline-color: ${props => props.theme.colors.success};
  `,
  successDark: css`
    outline-color: ${props => props.theme.colors.successDark};
  `,
  successDarker: css`
    outline-color: ${props => props.theme.colors.successDarker};
  `,
  warningLight: css`
    outline-color: ${props => props.theme.colors.warningLight};
  `,
  warning: css`
    outline-color: ${props => props.theme.colors.warning};
  `,
  warningDark: css`
    outline-color: ${props => props.theme.colors.warningDark};
  `,
  warningDarker: css`
    outline-color: ${props => props.theme.colors.warningDarker};
  `
}

// contains all the colors that outlineColor supports, but for font colors only
const allColorsPreset = {
  primaryLight: css`
    color: ${props => props.theme.colors.primaryLight};
  `,
  primary: css`
    color: ${props => props.theme.colors.primary};
  `,
  primaryDark: css`
    color: ${props => props.theme.colors.primaryDark};
  `,
  primaryDarker: css`
    color: ${props => props.theme.colors.primaryDarker};
  `,
  darkNeutralLight: css`
    color: ${props => props.theme.colors.darkNeutralLight};
  `,
  darkNeutral: css`
    color: ${props => props.theme.colors.darkNeutral};
  `,
  darkNeutralDark: css`
    color: ${props => props.theme.colors.darkNeutralDark};
  `,
  darkNeutralDarker: css`
    color: ${props => props.theme.colors.darkNeutralDarker};
  `,
  lightNeutralLight: css`
    color: ${props => props.theme.colors.lightNeutralLight};
  `,
  lightNeutral: css`
    color: ${props => props.theme.colors.lightNeutral};
  `,
  lightNeutralDark: css`
    color: ${props => props.theme.colors.lightNeutralDark};
  `,
  lightNeutralDarker: css`
    color: ${props => props.theme.colors.lightNeutralDarker};
  `,
  dangerLight: css`
    color: ${props => props.theme.colors.dangerLight};
  `,
  danger: css`
    color: ${props => props.theme.colors.danger};
  `,
  dangerDark: css`
    color: ${props => props.theme.colors.dangerDark};
  `,
  dangerDarker: css`
    color: ${props => props.theme.colors.dangerDarker};
  `,
  successLight: css`
    color: ${props => props.theme.colors.successLight};
  `,
  success: css`
    color: ${props => props.theme.colors.success};
  `,
  successDark: css`
    color: ${props => props.theme.colors.successDark};
  `,
  successDarker: css`
    color: ${props => props.theme.colors.successDarker};
  `,
  warningLight: css`
    color: ${props => props.theme.colors.warningLight};
  `,
  warning: css`
    color: ${props => props.theme.colors.warning};
  `,
  warningDark: css`
    color: ${props => props.theme.colors.warningDark};
  `,
  warningDarker: css`
    color: ${props => props.theme.colors.warningDarker};
  `
}

// contains all color and bg, without a hover or active effect (used in container for example)
const colorBgPreset = {
  primary: css`
  color: ${props => props.theme.colors.primaryLight};
  background-color: ${props => props.theme.colors.primary};
`,
  darkNeutral: css`
  color: ${props => props.theme.colors.darkNeutralLight};
  background-color: ${props => props.theme.colors.darkNeutral};
`,
  lightNeutral: css`
  color: ${props => props.theme.colors.lightNeutralLight};
  background-color: ${props => props.theme.colors.lightNeutral};
`,
  danger: css`
  color: ${props => props.theme.colors.dangerLight};
  background-color: ${props => props.theme.colors.danger};
`,
  success: css`
  color: ${props => props.theme.colors.successLight};
  background-color: ${props => props.theme.colors.success};
`,
  warning: css`
  color: ${props => props.theme.colors.warningLight};
  background-color: ${props => props.theme.colors.warning};
`,
  transparent: css`
  color: #fff;
  background-color: transparent;
`
}

const roundButtonSizePreset = {
  xs: css`
    padding: ${props => props.theme.spaces.smaller} ${props => props.theme.spaces.smaller};
  `,
  s: css`
    padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.small};
  `,
  m: css`
    padding: ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium};
  `,
  l: css`
    padding: ${props => props.theme.spaces.large} ${props => props.theme.spaces.large};
  `,
  xl: css`
    padding: ${props => props.theme.spaces.larger} ${props => props.theme.spaces.larger};
  `
}

const iconSizePreset = {
  xs: css`
    height: ${props => props.theme.fontSizes.smaller};
    width: ${props => props.theme.fontSizes.smaller};
    padding: 1px;
    font-size: ${props => props.theme.fontSizes.extraSmall};
  `,
  s: css`
    height: ${props => props.theme.fontSizes.small};
    width: ${props => props.theme.fontSizes.small};
    padding: 2px;
    font-size: ${props => props.theme.fontSizes.smaller};
  `,
  m: css`
    height: ${props => props.theme.fontSizes.medium};
    width: ${props => props.theme.fontSizes.medium};
    padding: 2px;
    font-size: ${props => props.theme.fontSizes.small};
  `,
  l: css`
    height: ${props => props.theme.fontSizes.large};
    width: ${props => props.theme.fontSizes.large};
    padding: 4px;
    font-size: ${props => props.theme.fontSizes.medium};
  `,
  xl: css`
    height: ${props => props.theme.fontSizes.larger};
    width: ${props => props.theme.fontSizes.larger};
    padding: 8px;
    font-size: ${props => props.theme.fontSizes.large};
  `,
  xxl: css`
    height: ${props => props.theme.fontSizes.extraLarge};
    width: ${props => props.theme.fontSizes.extraLarge};
    padding: 10px;
    font-size: ${props => props.theme.fontSizes.larger};
  `,
  responsive: css`
    // figure this out later
    /*
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    line-height: 1;
    */
  `
}

const squareSizePreset = {
  xs: css`
    padding: ${props => props.theme.fontSizes.smaller};
  `,
  s: css`
    padding: ${props => props.theme.fontSizes.small};
  `,
  m: css`
    padding: ${props => props.theme.fontSizes.medium};
  `,
  l: css`
    padding: ${props => props.theme.fontSizes.large};
  `,
  xl: css`
    padding: ${props => props.theme.fontSizes.larger};
  `,
  xxl: css`
    padding: ${props => props.theme.fontSizes.extraLarge};
  `
}

const containerSizePreset = {
  xs: css`
    padding: ${props => props.theme.spaces.smaller} ${props => props.theme.spaces.smaller};
  `,
  s: css`
    padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.small};
  `,
  m: css`
    padding: ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium};
  `,
  l: css`
    padding: ${props => props.theme.spaces.large} ${props => props.theme.spaces.large};
  `,
  xl: css`
    padding: ${props => props.theme.spaces.larger} ${props => props.theme.spaces.larger};
  `,
  xxl: css`
    padding: ${props => props.theme.spaces.extraLarge} ${props => props.theme.spaces.extraLarge};
  `
}

// --- ATOMS ---

// 180 variations
export const buttonPreSets = {
  variant: {
    pill: css``,
    newChat: css`
      &:active { // guessed value
        box-shadow: ${props => props.theme.insets.normal};
      }
    `,
    save: css`
      // overrides size
      padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.medium}; // default size
      font-size: ${props => props.theme.fontSizes.smaller}; // default size
      &:active { // guessed value
        box-shadow: ${props => props.theme.insets.normal};
      }
    `,
    exit: css`
      // Size has no effect on exit.
      // Assuming there is just 1 exit size. 
      // If there is more than 1 size, you must extract exit out to it's own component
      // overrides color, padding (padding not compatible with size prop)
      padding: ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium};
      color: ${props => props.theme.colors.dangerLight};
      background-color: ${props => props.theme.colors.danger};
      &:hover {
        background-color: ${props => props.theme.colors.dangerHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.dangerActive};
        box-shadow: ${props => props.theme.insets.normal};
      }
    `,
    chatroomOptions: css`
      // This component expects React Components as Children
      // overrides background color and padding-top, padding-bottom
      display: flex;
      flex-direction: column;
      padding-top: ${props => props.theme.spaces.small}; // padding override
      padding-bottom: ${props => props.theme.spaces.small}; // padding override
      background-color: ${props => props.theme.colors.lightNeutral}; // background color override
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive};
        box-shadow: ${props => props.theme.insets.normal};
      }
    `,
    messageControl: css`
      // overrides background color and size
      background-color: ${props => props.theme.colors.lightNeutral}; // color override
      padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.medium}; // size override
      font-size: ${props => props.theme.fontSizes.smaller}; // size override
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive};
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
  color: colorPreset
}

// 30 variations
export const exitButtonPreSets = {
  size: roundButtonSizePreset,
  color: colorPreset
}

// 30 variations
export const squareButtonPreSets = {
  size: squareSizePreset,
  color: colorPreset
}

// 3,600 variations
export const dropDownButtonPreSets = {
  size: {
    xs: css`
      padding: ${props => props.theme.spaces.smaller} ${props => props.theme.spaces.smaller};
      border-radius: ${props => props.theme.spaces.small};
    `,
    s: css`
      padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.small};
    `,
    m: css`
      padding: ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium};
    `,
    l: css`
      padding: ${props => props.theme.spaces.large} ${props => props.theme.spaces.large};
    `,
    xl: css`
      padding: ${props => props.theme.spaces.larger} ${props => props.theme.spaces.larger};
    `
  },
  color: colorPreset,
  outlineSize: outlineSizePreset,
  outlineColor: outlineColorPreset
}

// see also: https://stackoverflow.com/questions/38320878/circle-button-css
// see also: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
// 691,200 variations
export const iconButtonPreSets = {
  variant: {
    confirmOutline: css`
      // initially: 
      
      // success color
      color: ${props => props.theme.colors.success};
      
      // l size
      height: ${props => props.theme.fontSizes.large};
      width: ${props => props.theme.fontSizes.large};
      padding: 3px;
      font-size: ${props => props.theme.fontSizes.medium};

      // background transparentSuccess
      background-color: ${props => props.theme.colors.success}00;
      &:hover {
        background-color: ${props => props.theme.colors.successHover}20;
      }
      &:active {
        background-color: ${props => props.theme.colors.successActive}20;
      }
      
      // outlineColor success
      outline-color: ${props => props.theme.colors.success};
      
      // outlineSize xs
      outline-width: 1px;
    `,
    declineOutline: css`
      // initially: 
      
      // danger color
      color: ${props => props.theme.colors.danger};
      
      // l size
      height: ${props => props.theme.fontSizes.large};
      width: ${props => props.theme.fontSizes.large};
      padding: 3px;
      font-size: ${props => props.theme.fontSizes.medium};

      // background transparentDanger
      background-color: ${props => props.theme.colors.danger}00;
      &:hover {
        background-color: ${props => props.theme.colors.dangerHover}20;
      }
      &:active {
        background-color: ${props => props.theme.colors.dangerActive}20;
      }
      
      // outlineColor danger
      outline-color: ${props => props.theme.colors.danger};
      
      // outlineSize xs
      outline-width: 1px;
    `,
    mediaControllerOutline: css`
      // initially: 

      // lightNeutral color
      color: ${props => props.theme.colors.lightNeutralLight};

      // background transparentLightNeutral
      background-color: ${props => props.theme.colors.lightNeutral}00;
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover}20;
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive}20;
      }

      // outlineColor lightNeutralLight
      outline-color: ${props => props.theme.colors.lightNeutralLight};

      // outlineSize l
      outline-width: 14px;

      // initially xxl size
      height: ${props => props.theme.fontSizes.extraLarge};
      width: ${props => props.theme.fontSizes.extraLarge};
      padding: 4px;
      font-size: ${props => props.theme.fontSizes.larger};
    `,
    icon: css`
      // initially: 

      // primary color
      color: ${props => props.theme.colors.primary};

      // background transparentPrimary
      background-color: ${props => props.theme.colors.primary}00;
      &:hover {
        background-color: ${props => props.theme.colors.primaryHover}20;
      }
      &:active {
        background-color: ${props => props.theme.colors.primaryActive}20;
      }

      // outlineSize none
      outline-width: 0;

      // initially xl size
      height: ${props => props.theme.fontSizes.larger};
      width: ${props => props.theme.fontSizes.larger};
      padding: 8px;
      font-size: ${props => props.theme.fontSizes.large};
    `
  },
  color: allColorsPreset,
  background: transparentColorPreset,
  size: iconSizePreset,
  outlineSize: outlineSizePreset,
  outlineColor: outlineColorPreset
}

export const containerPreSets = {
  variant: {
    normal: css`
      outline-width: 0;
    `,
    outline: css`
      // outline size is xs
      outline-width: 1px;
      // outline color is lightNeutralLight
      outline-color: ${props => props.theme.colors.lightNeutralLight};
    `
  },
  size: containerSizePreset,
  color: colorBgPreset,
  outlineSize: outlineSizePreset,
  outlineColor: outlineColorPreset
}

export const messagePreSets = {
  variant: {
    sent: css`
      border-radius: ${props => props.theme.spaces.medium} 0 ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium};
    `,
    received: css`
      border-radius: 0 ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium} ${props => props.theme.spaces.medium};
      // pre-set color for this is Light Base Neutral
      color: ${props => props.theme.colors.lightNeutralLight};
      background-color: ${props => props.theme.colors.lightNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive};
      }
    `
  },
  color: colorPreset
}

export const notificationPreSets = {
  variant: {
    read: css`
      // color is transparent
      color: transparent;
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
    `,
    unread: css`
      // color is primary
      color: ${props => props.theme.colors.primaryLight};
      background-color: ${props => props.theme.colors.primary};
      &:hover {
        background-color: ${props => props.theme.colors.primaryHover};
      }
    `
  },
  color: {
    primary: css`
      color: ${props => props.theme.colors.primaryLight};
      background-color: ${props => props.theme.colors.primary};
      &:hover {
        background-color: ${props => props.theme.colors.primaryHover};
      }
    `,
    darkNeutral: css`
      color: ${props => props.theme.colors.darkNeutralLight};
      background-color: ${props => props.theme.colors.darkNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.darkNeutralHover};
      }
    `,
    lightNeutral: css`
      color: ${props => props.theme.colors.lightNeutralLight};
      background-color: ${props => props.theme.colors.lightNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
    `,
    danger: css`
      color: ${props => props.theme.colors.dangerLight};
      background-color: ${props => props.theme.colors.danger};
      &:hover {
        background-color: ${props => props.theme.colors.dangerHover};
      }
    `,
    success: css`
      color: ${props => props.theme.colors.successLight};
      background-color: ${props => props.theme.colors.success};
      &:hover {
        background-color: ${props => props.theme.colors.successHover};
      }
    `,
    warning: css`
      color: ${props => props.theme.colors.warningLight};
      background-color: ${props => props.theme.colors.warning};
      &:hover {
        background-color: ${props => props.theme.colors.warningHover};
      }
    `
  },
  size: {
    xs: css`
    height: ${props => props.theme.fontSizes.smaller};
    width: ${props => props.theme.fontSizes.smaller};
  `,
    s: css`
    height: ${props => props.theme.fontSizes.small};
    width: ${props => props.theme.fontSizes.small};
  `,
    m: css`
    height: ${props => props.theme.fontSizes.medium};
    width: ${props => props.theme.fontSizes.medium};
  `,
    l: css`
    height: ${props => props.theme.fontSizes.large};
    width: ${props => props.theme.fontSizes.large};
  `,
    xl: css`
    height: ${props => props.theme.fontSizes.larger};
    width: ${props => props.theme.fontSizes.larger};
  `,
    xxl: css`
    height: ${props => props.theme.fontSizes.extraLarge};
    width: ${props => props.theme.fontSizes.extraLarge};
  `
  }
}

// chatInput Small variant overrides button size
export const chatInputPresets = {
  variant: {
    small: css`
      & textarea {
        padding: 0;
      }
      & button {
        height: ${props => props.theme.fontSizes.large};
        width: ${props => props.theme.fontSizes.large};
        padding: 4px;
        font-size: ${props => props.theme.fontSizes.medium};
      }
    `,
    default: css`
      padding: .5rem ${props => props.theme.fontSizes.smaller};
    `
  },
  color: colorPreset
}

export const searchInputPresets = {
  variant: {
    default: css`
      padding: .25rem ${props => props.theme.fontSizes.smaller};
      border-radius: ${props => props.theme.spaces.larger};
    `
  },
  color: colorPreset
}

// ------
// --- Molecules ---

// Note: The variants will have custom css and also conditional rendering
export const tilesPresets = {
  variant: {
    image: css``,
    link: css`
      & span {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 75%;
        left: 0%;
        width: 100%;
        height: 25%;
        background-color: gray;
        
    }
    & span p{
        font-size: ${props => props.theme.fontSizes.extraSmall};
        animation: linkMarquee 10s infinite linear;
        box-shadow: none;
    }

    @keyframes linkMarquee {
        0% {
            translate: 80%;
        }
        100% {
            translate: -80%;
        }
    }
    `,
    video: css`
      & span {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        padding: 0 ${props => props.theme.spaces.smaller};
        bottom: 5%;
        right: 5%;
        height: 18%;
        background-color: ${props => props.theme.colors.darkNeutral};
      }
      & span p{
        font-size: 8px;
        box-shadow: none;
    }
    `,
    audio: css`
      color: ${props => props.theme.colors.lightNeutralLight};
      background-color: ${props => props.theme.colors.lightNeutral};
      &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
      }
      &:active {
        background-color: ${props => props.theme.colors.lightNeutralActive};
      }
      & span {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        padding: 0 ${props => props.theme.spaces.smaller};
        bottom: 5%;
        right: 5%;
        height: 18%;
        background-color: ${props => props.theme.colors.darkNeutral};
      }
      & span p{
        font-size: 8px;
        box-shadow: none;
    }
    `
  },
  color: colorPreset
}

export const messageBarPresets = {
  color: colorPreset
}

export const chatRoomCardPresets = {
  variant: {
    read: css``,
    unread: css``
  },
  color: colorPreset
}

// No new styles for variants, only conditional rendering for components
export const nestedButtonPresets = {
  variant: {
    savedMMS: css``,
    eyeglass: css``,
    save: css``,
    newMedia: css``
  },
  color: colorPreset
}

export const closeRightBarPresets = {
  variant: {
    open: css`
      right: 0;
      transition: 350ms;
    `,
    closed: css`
      right: -310px;
      padding-left: 3rem;
    `
  },
  color: colorPreset
}

// All values found through experiment
// This is the left container for the Right Navbar Molecule
export const leftComponentWrapperSideNavPresets = {
  variant: {
    open: css`
     &:first-child {
      width: calc(100% - 360px);
      transition: 350ms;
     }
    `,
    closed: css`
     &:first-child {
      width: calc(100% - 50px);
      transition: 850ms;
     }
    `
  }
}

export const nestedExitButtonPresets = {
  variant: {
    photoAttachment: css``,
    emptyFrame: css``,
    linkAttachment: css``
  },
  color: colorPreset
}

// ------
// --- Organisms ---

export const rightBarControlPanelPresets = {
  variant: {
    messageControl: css``,
    media: css`
      grid-template-columns: repeat(3, 1fr);
    `,
    chatroomOptions: css``
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
