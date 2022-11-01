import { createGlobalStyle } from 'styled-components'

// This provides default global CSS that is as minimal and as reasonable as possible
// @todo: add default font-family
const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: ${props => props.theme.fontSizes.medium};
    font-family: 'Poppins', 'Source Sans Pro', 'sans-serif';
    // Will we use Poppins?
}

a {
    text-decoration: none;
}

body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.colors.body};
    color: ${props => props.theme.colors.defaultFontColor};
}

p, input, button, li, a, span {
    color: ${props => props.theme.colors.defaultFontColor};
}

p, input, li, a, span :hover{
    color: ${props => props.theme.colors.defaultFontColor};
    box-shadow: ${props => props.theme.elevations.extraSmall};
}

// appears like basic button by default
button {
    background-color: ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spaces.medium};
    border-radius: ${props => props.theme.spaces.large};
    outline: none;
    border: 0px solid transparent;
}

button:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    box-shadow: ${props => props.theme.elevations.extraSmall};
    cursor: pointer;
}

// appears like square bar container by default (Message Input)
input {
    background-color: ${props => props.theme.colors.lightNeutral};
    border-radius: ${props => props.theme.spaces.medium};
    padding: ${props => props.theme.spaces.medium};
    color: ${props => props.theme.colors.defaultFontColor};
    outline: none;
    border: 0px solid transparent;
}

input:hover {
    background-color: ${props => props.theme.colors.lightNeutralHover};
}

// basic icon uses default font colors
.icon {
    padding: 0;
    margin: 0;
    color: ${props => props.theme.colors.defaultFontColor};
}

.icon:hover {
        transition: 350ms;
        color: ${props => props.theme.colors.primaryLightHover} !important;
        cursor: pointer;
}

`

export default GlobalStyle