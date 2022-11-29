import styled from 'styled-components'

// @TODO: Fix the cutting off top visual glitch
export const UserName = styled.h1`
    font-size: 20px;
    font-weight: 100;
`

export const UserNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ChatFormContainer = styled.div`
    //position: absolute;
    //bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const StyledMessageContainer = styled.section`
    position: relative;
`

export const MessageOverflowContainer = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 756px;
    overflow-y: scroll;
    flex-shrink: 1;
    flex-grow: 1;
    scroll-behavior: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 1rem;
    overflow-anchor: none;
    flex-basis: auto;
    min-height: 0;

    & > [data-variant="sent"] {
        align-self: flex-end;
    }
    & > [data-variant="received"] {
        align-self: flex-start;
    }

    & > * {
        border: 1px solid blue;
        
        flex-grow: 1;
    }
    
`
