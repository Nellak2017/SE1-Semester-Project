import { TilesParent } from './Tiles.elements'
import { BsCardImage, BsLink45Deg } from 'react-icons/bs'
import { GrCirclePlay } from 'react-icons/gr'
import { GiSoundWaves } from 'react-icons/gi'

// TODO: Add Unit testing for this function
// TODO: Fix edge cases for this function
// This function works for most test cases. It fails in some very specific cases like ('0','','0'), but mostly is good. Just use properly
const calculateTimeString = (hours, minutes, seconds) => {
  let returnStr = ''

  if (hours && parseInt(hours) !== parseInt(hours)) { // if hours is defined and nan
    returnStr += ''
  } else if (hours && parseInt(hours) === parseInt(hours) && hours > 0) { // if hours is defined and not nan and greater than 0
    returnStr += parseInt(hours) + ':'
  }

  if (minutes && parseInt(minutes) !== parseInt(minutes)) { // if minutes is defined and nan
    returnStr += '00'
  } else if (hours && hours > 0 && minutes && parseInt(minutes) === parseInt(minutes)) { // if minutes and hours is defined and not nan
    returnStr += (parseInt(minutes) % 60).toString().padStart(2, '0')
  } else if (hours && hours <= 0 && minutes && parseInt(minutes) === parseInt(minutes)) { // if minutes and hours is defined and not nan
    returnStr += (parseInt(minutes) % 60).toString()
  } else if (!hours && minutes && parseInt(minutes) === parseInt(minutes)) {
    returnStr += (parseInt(minutes) % 60).toString()
  } else if (!minutes && seconds) { // if minutes not defined but seconds are
    returnStr += '00'
  } else if (hours && !minutes && !seconds) {
    returnStr += '00'
  } else if (!hours && !minutes && !seconds) {
    returnStr += '0'
  }

  if (seconds && parseInt(seconds) !== parseInt(seconds)) { // if seconds is defined and nan
    returnStr += ':00'
  } else if (seconds && parseInt(seconds) === parseInt(seconds)) { // if seconds is defined and not nan
    returnStr += ':' + (parseInt(seconds) % 60).toString().padStart(2, '0')
  } else if (!seconds) { // if seconds not defined
    returnStr += ':00'
  }

  return returnStr
}

function Tiles (props) {
  const { size = 'm', color = 'lightNeutral', variant, backgroundImage, linkText, hours, minutes, seconds, ...rest } = props
  const bgImg = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  return (
    <>
      {variant === 'image' &&
        <TilesParent style={bgImg} size={size} variant={variant} {...rest}>
          <BsCardImage />
        </TilesParent>}
      {variant === 'link' &&
        <TilesParent size={size} variant={variant} linkText={linkText} color={color} {...rest}>
          <BsLink45Deg />
          <span><p>{linkText}</p></span>
        </TilesParent>}
      {variant === 'video' &&
        <TilesParent style={bgImg} size={size} variant={variant} color={color} hours={hours} minutes={minutes} seconds={seconds} {...rest}>
          <GrCirclePlay />
          <span>
            <p>{calculateTimeString(hours, minutes, seconds)}</p>
          </span>
        </TilesParent>}
      {variant === 'audio' &&
        <TilesParent style={bgImg} size={size} variant={variant} color={color} hours={hours} minutes={minutes} seconds={seconds} {...rest}>
          <GiSoundWaves />
          <span>
            <p>{calculateTimeString(hours, minutes, seconds)}</p>
          </span>
        </TilesParent>}
      {['image', 'link', 'video', 'audio'].every(element => element !== variant) &&
        <TilesParent size={size} color={color} hours={hours} minutes={minutes} seconds={seconds} {...rest}>
          <p style={{ boxShadow: 'none' }}>Invalid Variant Entered into Tiles Molecule</p>
        </TilesParent>}
    </>
  )
}

export default Tiles
