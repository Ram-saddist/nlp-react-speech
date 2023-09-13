import axios from 'axios'
import Chatbot from './Chatbot.png'
import hi from './hi.gif'
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useState} from "react";
import SpeackComponent from './SpeackComponent';

const App = () => {   
   
    const [isActive, setIsActive] = useState(false);
    const [isResultActive,setIsResultActive]=useState(false)
    const [backendResponse,setBackendResponse]=useState("")
    const [backendQueryResponse,setBackendQueryResponse]=useState("")
    const [count,setCount]=useState(0)
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
                <img className='bot-image'  src={hi}/>
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
                <SpeackComponent count={count}/>
                <div style={{display:isResultActive ? 'block' : 'none'}} className='result'>
                    <span className='backendResponse'>{backendQueryResponse}</span>
                    <span className='backendResponse'>{backendResponse}</span>
                </div>
            </div>
        </>
    );
};

export default App;