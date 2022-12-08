import {
  FormContainer,
  ChatFormStyled,
  ExitButtonStyled,
  LeftButtonBottom,
  LeftButtonMiddle,
  LeftButtonTop,
  MediaBox
} from './ChatForm.elements'
import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import ChatInput from '../../Atoms/ChatInput/ChatInput'
import MessageBar from '../../Molecules/MessageBar/MessageBar'
import NestedButton from '../../Molecules/NestedButton/NestedButton'
import NestedExitButton from '../../Molecules/NestedExitButton/NestedExitButton'
import Movie from '../../../../public/movie.jpg'
import Audio from '../../../../public/audio-transparent.jpg'
import TextDurPopup from '../../Molecules/TextDurPopup/TextDurPopup'

/*
// @TODO: Left Side Listeners: Remove. Add 2 sub-buttons to the chat input. 1st = preview, 2nd = alter duration of text
// @TODO: Form State -> JSON function + Tests
// @TODO: if 1 media submitted then it is not a par tag
// @TODO: Create API that POST to DB
// @TODO: Add .src to background images so that it can be read in production
// @TODO: When form is submitted, handle it
*/

const formJSON = {
  text: {
    src: '',
    begin: '',
    end: '',
    dur: ''
  },
  img: {
    src: '',
    begin: '',
    end: '',
    dur: ''
  },
  audio: {
    src: '',
    begin: '',
    end: '',
    dur: ''
  },
  video: {
    src: '',
    begin: '',
    end: '',
    dur: ''
  }
}

const formBLOBs = {
  img: '',
  audio: '',
  video: ''
}

function ChatForm (props) {
  const { ...rest } = props
  const inputRef = useRef()
  const [small, setSmall] = useState(false) // if small -> molecule, if !small -> full size
  const [textDurationVisible, setTextDurationVisible] = useState(false) // Shows text duration modifier or not
  const [mediaVisible, setMediaVisible] = useState({ 0: false, 1: false, 2: false, 3: false }) // laziest possible way to see if media is visible. Obv. Not generalizable
  const [textInput, setTextInput] = useState('') // stores the 2 chatinputs as 1 here.
  const [mediaJSON, setMediaJSON] = useState(formJSON) // Holds JSON for Form. Used for turning into SMIL and sending to Server
  const [mediaBLOBs, setMediaBLOBs] = useState(formBLOBs) // Holds actual Media BLOB data. Which is the file itself
  const onClickChangeSmall = () => { setSmall(!small) }
  const handleInputPress = () => { inputRef.current.click() } // Presses the File Input whenever you press the NestedButton
  const handleTextChange = (e) => { setTextInput(e.target.value) } // Not sure how to syncronize 2 input forms in formik
  const determineMediaType = (str, aud, video, img) => { // input your audio, video placeholders, and also your image too
    if (str?.includes('video')) return video
    else if (str?.includes('audio')) return aud
    else if (str?.includes('image')) return img
  }
  // Input: file , formik.values
  // Output: true|false --> If true then it is valid, if false then invalid
  // This is called when the user tries to input a file, if it is not valid, you can't even input it. But if you can, then the validate catches it.
  const validationFunction = (file, values) => {
    // 1. Convert file into file type
    const theValue = determineMediaType(file.type, 'audio', 'video', 'image')
    // 2. If the values has that file type, then return false, otherwise true
    return !values.some(obj => theValue === determineMediaType(obj.type, 'audio', 'video', 'image'))
  }
  const formik = useFormik({
    initialValues: {
      fileChooser: []
    },
    onSubmit: (values) => {
      // usually e.preventDefault() here
      console.log(values)
      console.log('form submitted')

      // 0. Get the Message ID (and chatroom ID?) for the particular message being sent, call them mid and cid
      // 1. Get the src for all the media that are being submitted(based on mid and cid), add src info to each in the mediaJSON
      // 2. (The duration infos are already set by the form below), Loop thru fileChooser and assign to mediaBLOBs
      // 3. Convert mediaJSON into a SMIL String, save it into SMILForServer variable
      // 4. POST {type: SMIL, ...SMILForServer} at (chatroomID: cid, messageID: mid)
      // 5. POST {type: BLOB, ...mediaBLOBs} at (chatroomID: cid, messageID: mid)
    },
    validate: (values) => {
      // This Function is run onSubmit mostly. The validationFunction covers when it is entered in the Form
      const errors = {}
      // Constraint #1: The media should have a Set of the media types
      // 1. Convert values array to a list of media types
      const theValues = values.fileChooser.map(file => determineMediaType(file.type, 'audio', 'video', 'image'))
      // 2. Create a set of the media types
      const theSet = [...new Set(theValues)]
      // 3. Compare set of media types with the values. If equal (regardless of order) then we are good! If not we have invalid inputs.
      const isValuesSetType = (theValues.length === theSet.length && theValues.every(el => theSet.includes(el)))
      if (!isValuesSetType) errors.fileChooser = 'Cannot have more than one of each type'
      return errors
    }
  })

  const durationListener = (FileType, begin, end, dur) => { // Handles Setting Durations for Media Inputs and Text Input
    // If the begin, end, dur are empty, then set to ''
    if (typeof begin === 'undefined' || begin === null || isNaN(begin)) begin = ''
    if (typeof end === 'undefined' || end === null || isNaN(end)) end = ''
    if (typeof dur === 'undefined' || dur === null || isNaN(dur)) begin = ''

    // FileType can .includes(Audio), .includes(Video), .includes(Image)
    if (FileType?.includes('audio') || FileType?.includes('video') || FileType?.includes('image') || FileType?.includes('text')) {
      let file = 'Nothing'
      if (FileType?.includes('audio')) file = 'audio'
      else if (FileType?.includes('video')) file = 'video'
      else if (FileType?.includes('image')) file = 'image'
      else if (FileType?.includes('text')) file = 'text'

      begin = begin >= 0 && begin <= 999999 ? begin + 's' : ''
      end = end > 0 && end <= 999999 ? end + 's' : ''
      dur = dur > 0 && dur <= 999999 ? dur + 's' : ''

      setMediaJSON(rest => ({ ...rest, [file]: { ...rest[file], begin, end, dur } }))
    }
  }

  return (
    <>
      <ReactTooltip globalEventOff='click' />
      <FormContainer color={!small ? 'lightNeutral' : 'transparent'} borderRadius={20} {...rest}>
        {!small &&
          <>
            <LeftButtonTop variant='savedMMS' color='lightNeutral' data-tip='Set Text Duration Information' onClick={() => setTextDurationVisible(!textDurationVisible)} />
            {/* <LeftButtonMiddle variant='save' color='lightNeutral' /> */}
            <LeftButtonMiddle variant='eyeglass' color='lightNeutral' data-tip='See a Preview' onClick={() => console.log('@TODO: Add Preview')} />
            {textDurationVisible &&
              <TextDurPopup
                listener={({ begin, end, dur }) => { durationListener('text', begin, end, dur) }}
                style={{ position: 'absolute', top: '20%', left: '70%', zIndex: '999' }}
              />}
            <ExitButtonStyled size='s' onClick={onClickChangeSmall} data-tip='Minimize Chat Form' />
            <ChatFormStyled onSubmit={formik.handleSubmit} encType='multipart/form-data'>
              <MediaBox>
                <NestedButton
                  type='button'
                  onClick={handleInputPress}
                  variant='newMedia'
                  color='darkNeutral'
                  size='m'
                  padding={24}
                  borderRadius={20}
                  data-tip='Add Media'
                />
                <input
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type='file'
                  name='fileChooser'
                  accept='audio/*, video/*, image/*'
                  onChange={e => e.currentTarget.files[0] && validationFunction(e.currentTarget.files[0], formik.values.fileChooser) &&
                    formik.setFieldValue('fileChooser', formik.values.fileChooser.concat(e.currentTarget.files[0]))}
                />
                {
                  formik.values?.fileChooser.map((file, index) =>
                    <NestedExitButton
                      key={index}
                      backgroundImage={
                        determineMediaType(
                          formik.values?.fileChooser[index]?.type,
                          Audio,
                          Movie,
                          typeof formik.values?.fileChooser[index] !== 'undefined' ? URL.createObjectURL(formik.values?.fileChooser[index]) : undefined)
}
                      buttonListener={() => setMediaVisible(rest => ({ ...rest, [index]: !rest[index] }))}
                      iconListener={() => {
                        // When Exit Button is Pressed:
                        formik.setFieldValue(
                          'fileChooser',
                          [...formik.values.fileChooser.slice(0, index), ...formik.values.fileChooser.slice(index + 1, formik.values.fileChooser.length)]
                        ) // Remove the Media from the Form
                        durationListener(formik.values?.fileChooser[index]?.type, -1, 0, 0) // Reset the values of the form at that area
                        setMediaVisible(rest => ({ ...rest, [index]: false }))// Reset the values of the visibility at that area
                      }}
                      type='Button'
                      text='Edit'
                      color='darkNeutral'
                      size='m'
                      subSize='xs'
                      padding={24}
                      borderRadius={20}
                      style={{ position: 'relative' }}
                    >
                      {mediaVisible[index] &&
                        <TextDurPopup
                          listener={({ begin, end, dur }) => { durationListener(formik.values?.fileChooser[index]?.type, begin, end, dur) }}
                          style={{ position: 'absolute', top: '0', left: '100%', zIndex: '999' }}
                        />}
                    </NestedExitButton>
                  )
                }
                <button type='button' onClick={() => { console.log(mediaJSON); console.log(mediaVisible) }}>mediaJSON</button>
                <button type='button' onClick={() => console.log(formik.values.fileChooser)}>fileChooser</button>
              </MediaBox>
              <ChatInput
                onChange={handleTextChange}
                value={textInput}
                type='text'
                id='large-chat-input'
                name='large-chat-input'
                color='darkNeutral'
                size='m'
                onSubmitHandler={formik.handleSubmit}
                buttonType='submit'
              />
            </ChatFormStyled>
          </>}
        {small &&
          <MessageBar
            onChange={handleTextChange}
            value={textInput}
            type='text'
            id='small-chat-input'
            name='small-chat-input'
            buttonListener={onClickChangeSmall}
            submitType='submit'
            onSubmitHandler={formik.handleSubmit}
          />}
      </FormContainer>
    </>
  )
}

export default ChatForm
