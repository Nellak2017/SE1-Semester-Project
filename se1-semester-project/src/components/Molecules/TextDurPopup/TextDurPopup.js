import React, { useState } from 'react'
import { PopUpParent, PopUpOption } from './TextDurPopup.elements'
import Button from '../../Atoms/Button/Button'

// @TODO: Add General support more than just the default options
function TextDurPopup (props) {
  const { options, listener = ({ begin, end, dur }) => { console.log('no listeners assigned to TextDurPopup') }, ...rest } = props
  const [begin, setBegin] = useState(0)
  const [end, setEnd] = useState(0)
  const [dur, setDur] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault()
    listener({ begin, end, dur })
  }
  return (
    <>
      {!options &&
        <PopUpParent {...rest}>
          <PopUpOption key='popup1' type='number' min='0' max='999999' placeholder='begin' onChange={e => setBegin(e.currentTarget.value)} />
          <PopUpOption key='popup2' type='number' min='0' max='999999' placeholder='end' onChange={e => setEnd(e.currentTarget.value)} />
          <PopUpOption key='popup3' type='number' min='0' max='999999' placeholder='dur' onChange={e => setDur(e.currentTarget.value)} />
          <Button
            type='button'
            onClick={handleSubmit}
            style={{ opacity: '50%', paddingTop: '.25rem', paddingBottom: '.25rem' }}
            variant='save'
          >
            Save
          </Button>
        </PopUpParent>}
      {options && Array.isArray(options) &&
        <PopUpParent {...rest} onSubmit={listener}>
          {options.map((holder, index) =>
            <PopUpOption key={`popup${index}`} type='number' min='0' max='9999' placeholder={holder} />
          )}
          <Button
            type='submit'
            style={{ opacity: '50%', paddingTop: '.25rem', paddingBottom: '.25rem' }}
            variant='save'
          >
            Save
          </Button>
        </PopUpParent>}
    </>
  )
}

export default TextDurPopup
