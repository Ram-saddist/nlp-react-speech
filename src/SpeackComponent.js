import React, { useMemo, useEffect } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";

function SpeackComponent(props) {
    const { speak } = useSpeechSynthesis();   
    
    useEffect(() => {
        if (props.count) {
            speak({ text: `Okay the count of players is ${props.count} and here are the following details below` });
        }
    }, [props.count]);

    // Render an empty div or null, as the speaking is done in the useEffect
    return null;
}

export default SpeackComponent;
