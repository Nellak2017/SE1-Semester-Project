import React, { useState } from 'react'
import SMILPlayer from '../SMILPlayer/SMILPlayer'

// This Organism shows how to pass a Callback to SMILPlayer so that you can make it disappear!
function SMILPlayerTest (props) {
  const [exitClicked, setExitClicked] = useState(false)
  const handleExitClick = () => {
    setExitClicked(!exitClicked)
  }
  return (
    <>
      {exitClicked ? <div>Nothing here..</div> : <SMILPlayer exitBtnCallback={handleExitClick} {...props} />}
    </>
  )
}

export default SMILPlayerTest
