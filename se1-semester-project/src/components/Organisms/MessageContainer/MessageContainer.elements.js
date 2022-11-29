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

export const StyledMessageContainer = styled.section`
    display: flex;
    width: 100%;
    flex-direction: column;
    row-gap: 1rem;

    & > [data-variant="sent"] {
        align-self: flex-end;
    }
    & > [data-variant="received"] {
        align-self: flex-start;
    }
`
