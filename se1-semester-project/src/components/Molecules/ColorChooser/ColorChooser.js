import React, { useState, useRef } from 'react'
import {
  ColorChooserBtnParent,
  ColorChooserBtnChild,
  ColorChooserContainer,
  Cover,
  Temp
} from './ColorChooser.elements'
import { SketchPicker } from 'react-color'

// initial color is Primary color converted to RGBA
// Temp is there simply so that you can see it better in storybook
function ColorChooser (props) {
  const { ...rest } = props
  const ref = useRef(null)
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '144',
      g: '104',
      b: '254',
      a: '1'
    }
  })
  const handleClick = () => {
    ref.current.focus()
    setState(prev => ({ ...prev, displayColorPicker: !state.displayColorPicker }))
  }
  const handleClose = () => {
    setState(prev => ({ ...prev, displayColorPicker: false }))
  }
  const handleChange = (color) => {
    setState(prev => ({ ...prev, color: color.rgb }))
  }

  const bg = { background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})` }

  return (
    <ColorChooserBtnParent onClick={handleClick} ref={ref} {...rest}>
      <ColorChooserBtnChild style={bg} />
      {state.displayColorPicker
        ? <ColorChooserContainer>
          <Cover onClick={handleClose} />
          <SketchPicker color={state.color} onChange={handleChange} />
          </ColorChooserContainer>
			  : null}
    </ColorChooserBtnParent>
  )
}

export default ColorChooser
