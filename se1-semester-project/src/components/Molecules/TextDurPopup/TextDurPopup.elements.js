import styled from 'styled-components'

// This Component has 1 variant and 1 size hard coded in, but allows different texts as well

// holds the 3 popup options, top, middle, bottom
export const PopUpParent = styled.div`
    z-index: 100;
    display: inline-flex;
    flex-direction: column;
    row-gap: .25rem;
    & input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
     & input[type=number] {
        -moz-appearance: textfield;
        /* Firefox */
      }
`

// a simple input
export const PopUpOption = styled.input`
    font-size: 11px;
    padding-top: .25rem;
    padding-bottom: .25rem;
    width: 4rem;
    overflow: hidden;
    margin: 0;
    & > * {
        font-size: 10px;
        opacity: 50%;
    }
`
