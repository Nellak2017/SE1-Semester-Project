import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, dropDownButtonPreSets } from '../../design_system/theme'

// Add more controls
export const DropDownButtonStyled = styled.button`
    border-style: solid;
    border-radius: ${props => props.theme.spaces.medium};
    &:hover {
        box-shadow: ${props => props.theme.elevations.small};
      }
    &:active {
        box-shadow: ${props => props.theme.insets.normal};
    }
    ${space} 
    ${layout}
    ${typography}
    ${getPresetCSS(dropDownButtonPreSets, 'size')}
    ${getPresetCSS(dropDownButtonPreSets, 'color')} 
    ${getPresetCSS(dropDownButtonPreSets, 'borderSize')}
    ${getPresetCSS(dropDownButtonPreSets, 'borderColor')} 
`
