const fontSizes = ['10px', '12px', '14px', '16px', '24px', '40px', '64px']
fontSizes.extraSmall = fontSizes[0]
fontSizes.smaller = fontSizes[1]
fontSizes.small = fontSizes[2]
fontSizes.medium = fontSizes[3]
fontSizes.large = fontSizes[4]
fontSizes.larger = fontSizes[5]
fontSizes.extraLarge = fontSizes[6]

const breakpoints = ['600px', '900px', '1200px', '1800px']
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const spaces = ['4px', '8px', '16px', '32px', '48px', '56px']
spaces.smaller = spaces[0]
spaces.small = spaces[1]
spaces.medium = spaces[2]
spaces.large = spaces[3]
spaces.larger = spaces[4]
spaces.extraLarge = spaces[5]

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
    warningDarker: '#51412a'
  },
  fontSizes,
  breakpoints,
  spaces
}
