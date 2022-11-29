import styled from 'styled-components'

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
    width: 100%;
    max-height: 65vh;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 1rem;

    & > [data-variant="sent"] {
        align-self: flex-end;
    }
    & > [data-variant="received"] {
        align-self: flex-start;
    }
`
