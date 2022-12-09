import React, {useState} from 'react'
import {
  SmallSmilStyled,
  ExpandPlacer,
  PlayPlacer
} from './SMILSmallPlayer.elements'
import { IoMdExpand, IoIosPlay } from 'react-icons/io'
import IconButton from '../../Atoms/IconButton/IconButton'
import SMILPlayer from '../../Organisms/SMILPlayer/SMILPlayer'

// NOTE: Children is just SMIL String
function SMILSmallPlayer (props) {
  const { expandListener, playListener, children, ...rest } = props
  const [clicked, setClicked] = useState(false)
  const [exitClicked, setExitClicked] = useState(false)
  return (
    <>
      <SmallSmilStyled {...rest} onClick={() => {setClicked(true); setExitClicked(false); console.log('clicked')}}>
        <ExpandPlacer><IoMdExpand onClick={expandListener} /></ExpandPlacer>
        <PlayPlacer>
          <IconButton onClick={playListener} variant='mediaControllerOutline' size='xxl' outlineSize='l'>
            <IoIosPlay />
          </IconButton>
        </PlayPlacer>
      </SmallSmilStyled>
      {children && clicked && !exitClicked && <SMILPlayer smil={children} exitBtnCallback={() => {setClicked(false); setExitClicked(true);}}/>}
    </>
  )
}
export default SMILSmallPlayer
// style={{zIndex: clicked ? '2':'1'}}