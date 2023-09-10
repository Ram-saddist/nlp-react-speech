import axios from 'axios'
import Chatbot from './Chatbot.png'
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from "react-speech-kit";
import {useState} from "react";
import SpeackComponent from './SpeackComponent';

const App = () => {   
    
    const [isActive, setIsActive] = useState(false);
    const [isResultActive,setIsResultActive]=useState(false)
    const [backendResponse,setBackendResponse]=useState("")
    const [backendQueryResponse,setBackendQueryResponse]=useState("")
    const [count,setCount]=useState()
    const [speakResult,setSpeakResult]=useState(false)
    const { speak } = useSpeechSynthesis();
    //transcript is the text carrying one
    const { transcript,listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }
    const handleClick = () => {
        setIsActive(current => !current);
      };
      
    //speech to text
    const startListening = () => {
        setIsActive(true);
        setBackendResponse("")
        setBackendQueryResponse("")
        setIsResultActive(false)
        SpeechRecognition.startListening({ language: 'en-IN' })
    };

    //post action which we speak and getting response 
    function sendSpeech(){
        if(transcript!==""){
            axios.post("https://eswarnandivada.pythonanywhere.com/getdata",{
                transcript:transcript
            }).then((res)=>{
                console.log(res.data)
                setBackendResponse(res.data.data)
                setBackendQueryResponse(res.data.query)
                setCount(res.data.count)
                setIsResultActive(true)
            })
        }
    }
    return(
        <>
            <div className='bot'>
                <img className='bot-image'  src={Chatbot}/>
                <p className='click' onClick={startListening}>Click here</p>
                <span className='btn-close' style={{display:isActive ? 'block' : 'none',cursor:"pointer"}} onClick={handleClick}>X</span>
            </div>
            <div style={{display:isActive ? 'block' : 'none'}} className="container">
            {listening ? null : sendSpeech()}
                <h2 className='title'>CodeGnan Bot</h2>
                <br/>
                {/* the speech we are hearing is displayed in here */}
                <div className="main-content">
                    <span>{transcript}</span>
                </div>
                {isResultActive ? <SpeackComponent count={count}/> : null}
                <div style={{display:isResultActive ? 'block' : 'none'}} className='result'>
                    <span className='backendResponse'>{backendQueryResponse}</span>
                    <span className='backendResponse'>{backendResponse}</span>
                </div>
            </div>
        </>
    );
};

export default App;