import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, nestedButtonPresets } from '../../../design_system/theme'
import SquareButton from '../../Atoms/SquareButton/SquareButton'

export const NestedButtonParent = styled(SquareButton)`
    & svg {
        font-size: ${props => props.theme.fontSizes.large};
    }
    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(nestedButtonPresets, 'variant')}
    ${getPresetCSS(nestedButtonPresets, 'color')} 
`
