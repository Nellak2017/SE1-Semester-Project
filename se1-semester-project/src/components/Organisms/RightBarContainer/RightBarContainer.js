import React from 'react'
import CloseRightBar from '../../Molecules/CloseRightBar/CloseRightBar'
import RightBarControlPanel from '../RightBarControlPanel/RightBarControlPanel'
import UserProfile from '../../Molecules/UserProfile/UserProfile'
import Tile from '../../Molecules/Tile/Tile'
import Woman from '../../../../public/woman-in-field.jpg'
import Movie from '../../../../public/movie.jpg'

function RightBarContainer (props) {
  const linkMedia = <Tile variant='link' linkText='https://www.google.com' />
  const imgMedia = <Tile variant='image' backgroundImage={Woman} />
  const videoMedia = <Tile variant='video' backgroundImage={Movie} hours='0' minutes='5' seconds='42' />
  const mediaComponents = [imgMedia, linkMedia, linkMedia, videoMedia, imgMedia, linkMedia, imgMedia, linkMedia, videoMedia]

  const panels = (
    <>
      <UserProfile name='Name' alt='alt text here' />
      <RightBarControlPanel variant='messageControl' />
      <RightBarControlPanel variant='media' name='Media & Links' components={mediaComponents} />
      <RightBarControlPanel variant='chatroomOptions' />
    </>
  )
  const { leftComponent, rightComponent = panels, variant = 'closed', color, ...rest } = props

  return (
    <CloseRightBar leftComponent={leftComponent} rightComponent={rightComponent} variant={variant} {...rest} />
  )
}

export default RightBarContainer
