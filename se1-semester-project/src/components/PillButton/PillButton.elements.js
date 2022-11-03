import styled from 'styled-components'
import { variant } from 'styled-system'

// This will inherit basic styles from global css, and make new ones too for the component
// see also: https://styled-system.com/api#variant

// Todo: Add Theme Decorator to the story associated with this
// Todo: Re-write component style to incorporate Theme instead of defaults

export const PillButtonStyled = styled.button`
    // Styles shared by all variants, should theoretically be in Default CSS
    color: white; // given by default CSS or Theme
    border-radius: 32px; // large
    border: 0px solid transparent;
    background-color: #9068FE; // based on theme

    // Variant Specific Styles
    ${variant({
        variants: {
            default: {
                // change color, space, typography, layout, etc. with props passed in
                padding: '16px 32px'
            },
            small: {
                padding: '8px 16px'
            }
        }
    })}
`
