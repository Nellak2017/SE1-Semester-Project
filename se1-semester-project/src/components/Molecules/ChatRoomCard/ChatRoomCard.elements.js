import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, chatRoomCardPresets } from '../../../design_system/theme'
import Container from '../../Atoms/Container/Container'

export const ChatRoomCardParent = styled(Container)`
    display: inline-flex;
    column-gap: 1rem;
    align-items: center;
    max-width: 346px;
    width: 100%;
    border-radius: ${props => props.theme.fontSizes.large};

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(chatRoomCardPresets, 'variant')}
    ${getPresetCSS(chatRoomCardPresets, 'color')} 
`

export const CardDescription = styled.div`
    height: 100%;
    width: 100%;
    & h1 {
        max-width: 230px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 21px;
        font-weight: 500;
    }
    & p {
        max-width: 230px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 24px;
        font-size: ${props => props.theme.fontSizes.medium};
        font-weight: 100;
        opacity: 50%;
    }
`

export const CardImageContainer = styled.div`
    width: 72px;
    height: 72px;
    position: relative;

    & #notification {
        position: absolute;
        top: 0;
        right: -10;
    }
`

export const CardImage = styled.img`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
`
