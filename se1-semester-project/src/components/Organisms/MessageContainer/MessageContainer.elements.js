import styled from 'styled-components'

// @TODO: Add Tool Tips to the ChatForm
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
    row-gap: 1rem;
`

export const StyledMessageContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 2rem;
    width: 100%;
    height: 96vh;
`

export const MessageOverflowContainer = styled.div`
    width: 100%;
    max-height: 60vh;
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: auto;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    overflow-anchor: none;

    & > [data-variant="sent"] {
        align-self: flex-end;
    }
    & > [data-variant="received"] {
        align-self: flex-start;
    }
`
