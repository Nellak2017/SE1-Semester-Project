import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, buttonPreSets } from '../../design_system/theme'

// Note: The ordering of the 'getPresetCSS' determines the CSS Selector precedence
export const ButtonStyled = styled.button`
    // --- Common styles of most button variants ---
    outline: none;
    border: 0px solid transparent;
    border-radius: ${props => props.theme.spaces.large};
    &:hover {
        box-shadow: ${props => props.theme.elevations.small};
      }
    // ------ 
    ${space} // lowest precedence
    ${layout}
    ${typography}
    ${getPresetCSS(buttonPreSets, 'variant')}
    ${getPresetCSS(buttonPreSets, 'size')}
    ${getPresetCSS(buttonPreSets, 'color')} // highest precedence
`
