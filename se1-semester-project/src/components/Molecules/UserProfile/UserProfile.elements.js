import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, chatRoomCardPresets } from '../../../design_system/theme'
import Container from '../../Atoms/Container/Container'

// This follows an extremely similar pattern to ChatRoom Card
export const UserProfileParent = styled(Container)`
    padding: 0;
    display: inline-flex;
    column-gap: 1rem;
    align-items: center;
    max-width: 346px;
    border-radius: 0;

    &:hover{
        box-shadow: none;
    }

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(chatRoomCardPresets, 'variant')}
    ${getPresetCSS(chatRoomCardPresets, 'color')} 
`

export const CardDescription = styled.div`
    height: 100%;
    & h2 {
        max-width: 235px; // easter egg. This is atomic number of Uranium and my apt#
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const CardImageContainer = styled.div`
    width: 44px;
    height: 44px;
    position: relative;
`

export const CardImage = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
`
