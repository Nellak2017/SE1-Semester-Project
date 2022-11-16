import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import Container from '../../Atoms/Container/Container'

export const CardContainerParent = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 1rem;
    width: 100%;
    max-width: 390px;
    max-height: 100vh;
    border-radius: ${props => props.theme.spaces.medium};
    scroll-behavior: auto;
    scroll-behavior: smooth;
    overflow: auto;
    
    & h1 {
        font-size: 20px;
        font-weight: 200;
    }

    // coupling background colors here
    &:hover {
        box-shadow: none;
        background-color: ${props => props.theme.colors.lightNeutral};
        cursor: default;
    }
    &:active {
        box-shadow: none;
        background-color: ${props => props.theme.colors.lightNeutral};
        cursor: default;
    }
    ${space}
    ${layout}
    ${typography}
`

export const CardNavArea = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
