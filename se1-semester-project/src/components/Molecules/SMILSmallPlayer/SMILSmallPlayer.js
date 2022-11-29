import React from 'react'
import {
  SmallSmilStyled,
  ExpandPlacer,
  PlayPlacer
} from './SMILSmallPlayer.elements'
import { IoMdExpand, IoIosPlay } from 'react-icons/io'
import IconButton from '../../Atoms/IconButton/IconButton'

// @TODO: Add Small smil player support. Put a small version of the smil player in here with smil prop
function SMILSmallPlayer (props) {
  const { expandListener, playListener, ...rest } = props
  return (
    <>
      <SmallSmilStyled {...rest}>
        <ExpandPlacer><IoMdExpand onClick={expandListener} /></ExpandPlacer>
        <PlayPlacer>
          <IconButton onClick={playListener} variant='mediaControllerOutline' size='xxl' outlineSize='l'>
            <IoIosPlay />
          </IconButton>
        </PlayPlacer>
      </SmallSmilStyled>
    </>
  )
}

export default SMILSmallPlayer
