import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, tilesPresets } from '../../../design_system/theme'
import SquareButton from '../../Atoms/SquareButton/SquareButton'

export const TilesParent = styled(SquareButton)`
    position: relative;
    overflow: hidden;

    & svg {
        height: ${props => props.theme.fontSizes.larger};
        width: ${props => props.theme.fontSizes.larger};
        font-size: ${props => props.theme.fontSizes.medium};
    }
    & path {
        stroke: ${props => props.theme.colors.lightNeutralLight};
    }

    &:hover {
        & path,svg {
            color: ${props => props.theme.colors.lightNeutralLight}50;
            stroke: ${props => props.theme.colors.lightNeutralLight}50;
        }
    }
    &:active {
        & path,svg {
            color: ${props => props.theme.colors.lightNeutralLight}20;
            stroke: ${props => props.theme.colors.lightNeutralLight}20;
        }
    }

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(tilesPresets, 'variant')}
    ${getPresetCSS(tilesPresets, 'color')}  
`
