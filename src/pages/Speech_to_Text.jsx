import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Speech_to_Text() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      const startListening = () => {
        // setMic(!mic)
        SpeechRecognition.startListening({ continuous: true, language:'en-IN' })
      };
      const stopListening = () => {
        // setMic(!mic)
        SpeechRecognition.stopListening()
      };

    //   if (!browserSupportsSpeechRecognition) {
    //     alert("Browser doesn't support speech recognition.");
    //   }
  return (
    <div>
        
      <div>
        {transcript}
      </div>
    </div>
  )
}
