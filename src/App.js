import React from 'react';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const [whenClick,setWhenClick]=useState(false)
  const {
    transcript,
    listening,
    
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  function startSpeech(){
    SpeechRecognition.startListening()
    setWhenClick(true)
    if(listening=="false" && whenClick=="true"){
        sendData()
    }
  }
  function sendData(){
    alert()
  }
  console.log(listening,whenClick)
  //listening==false && whenClick==true
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startSpeech}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;


// import axios from 'axios'
// import Chatbot from './Chatbot.png'
// import "./App.css"
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import {useState} from "react";


// const App = () => {    
//     const [isActive, setIsActive] = useState(false);
//     const [backendResponse,setBackendResponse]=useState("")
//     //transcript is the text carrying one
//     const { transcript,listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

//     if (!browserSupportsSpeechRecognition) {
//         return null
//     }
//     const handleClick = () => {
//         setIsActive(current => !current);
//       };

//     //speech to text
//     const startListening = () => {
//         setIsActive(true);
//         SpeechRecognition.startListening({ language: 'en-IN' })
//         console.log(listening)
//     };

//     //post action which we speak and getting response 
//     function sendSpeech(){
//         console.log("send speech",transcript)
//         if(transcript!==""){
//             axios.post("http://aiassit-env.eba-mm9jyr3f.eu-north-1.elasticbeanstalk.com/getdata",{
//                 transcript:transcript
//             }).then((res)=>{
//                 console.log(res)
//                 setBackendResponse(res.data.message)
//             })
//         }
        
//     }
//     //text to speech 
//     function textSpeech(){}

//     return(
//         <>
//             <div className='bot'>
//                 <img className='bot-image' onClick={startListening} src={Chatbot}/>
//                 <span className='btn-close' style={{display:isActive ? 'block' : 'none',cursor:"pointer"}} onClick={handleClick}>X</span>
//             </div>
//             <div style={{display:isActive ? 'block' : 'none',}} className="container">
//             {listening ? null : sendSpeech()}
//                 <h2 className='title'>Chat Bot CodeGnan</h2>
//                 <br/>
//                 {/* the speech we are hearing is displayed in here */}
//                 <div className="main-content">
//                     <span>{transcript}</span>
//                     <span className='backendResponse'>{backendResponse}</span>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default App;