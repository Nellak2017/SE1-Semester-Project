import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, buttonPreSets } from '../../design_system/theme'

// This will inherit basic styles from global css, and make new ones too for the component
// see also: https://styled-system.com/api#variant

// Todo: Add Theme Decorator to the story associated with this
// Todo: Re-write component style to incorporate Theme instead of defaults

export const PillButtonStyled = styled.button`
    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(buttonPreSets, 'size')}
    ${getPresetCSS(buttonPreSets, 'color')}
    ${getPresetCSS(buttonPreSets, 'variant')}
`
