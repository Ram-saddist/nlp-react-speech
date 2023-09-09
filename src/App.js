import axios from 'axios'
import Chatbot from './Chatbot.png'
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useState} from "react";


const App = () => {    
    const [isActive, setIsActive] = useState(false);
    const [backendResponse,setBackendResponse]=useState("")
    const [backendQueryResponse,setBackendQueryResponse]=useState("")
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
        SpeechRecognition.startListening({ language: 'en-IN' })
    };

    //post action which we speak and getting response 
    function sendSpeech(){
        if(transcript!==""){
            axios.post("https://eswarcodegnan.pythonanywhere.com/getdata",{
                transcript:transcript
            }).then((res)=>{
                console.log(res.data)
                setBackendResponse(res.data.data)
                setBackendQueryResponse(res.data.query)
            })
        }
        
    }
    return(
        <>
            <div className='bot'>
                <img className='bot-image' onClick={startListening} src={Chatbot}/>
                <span className='btn-close' style={{display:isActive ? 'block' : 'none',cursor:"pointer"}} onClick={handleClick}>X</span>
            </div>
            <div style={{display:isActive ? 'block' : 'none',}} className="container">
            {listening ? null : sendSpeech()}
                <h2 className='title'>Chat Bot CodeGnan</h2>
                <br/>
                {/* the speech we are hearing is displayed in here */}
                <div className="main-content">
                    <span>{transcript}</span>
                    <span className='backendResponse'>{backendQueryResponse}</span>
                    <span className='backendResponse'>{backendResponse}</span>
                </div>
            </div>
        </>
    );
};

export default App;