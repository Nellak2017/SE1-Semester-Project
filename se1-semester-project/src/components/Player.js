import { useState, useEffect } from 'react'

const Player = ({ url }) => {
  const [audio, setAudio] = useState(null)
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    setAudio(new Audio(url))
  }, [])

  useEffect(() => {
    if (paused) audio?.pause()
    else audio?.play()
  }, [paused])

  return (
    <button
      onClick={() => {
        setPaused(!paused)
      }}
    >
      {paused ? 'Play' : 'Pause'} Audio
    </button>
  )
}

export default Player
