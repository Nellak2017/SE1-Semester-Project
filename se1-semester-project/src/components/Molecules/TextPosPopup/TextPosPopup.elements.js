import styled from 'styled-components'
import DropDownButton from '../../Atoms/DropDownButton/DropDownButton'

// This Component has 1 variant and 1 size hard coded in, but allows different texts as well

// holds the 3 popup options, top, middle, bottom
export const PopUpParent = styled.div`
    display: inline-flex;
    flex-direction: column;
    row-gap: .5rem;
`

// Basically a Drop Down Button, but with overridden padding l,r
export const PopUpOption = styled(DropDownButton)`
    padding-left: 2.2rem;
    padding-right: 2.2rem;
    font-size: 10px;
    & > * {
        font-size: 10px;
        opacity: 50%;
    }
`
