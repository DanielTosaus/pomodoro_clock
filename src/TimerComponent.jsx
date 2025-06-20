import { useEffect } from "react"
function TimerComponent(props){

    // Helper: Convert seconds to mm:ss
    function formatTime(seconds) {
        const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
        const ss = String(seconds % 60).padStart(2, '0')
        return `${mm}:${ss}`
    }
    function playClick(){
        const audio_click = document.getElementById("main-click")
        if (audio_click){
            audio_click.currentTime = 0; // Restart audio from the beginning
            audio_click.volume = 0.1;
            audio_click.play();
        }
    }
    return (
        <div id="timer-wrapper">
            <p id="timer-label">{props.label}</p>
            <p id="time-left">{formatTime(props.timeLeft)}</p>
            <div id="timer-buttons-container">
                <div className="button-wrapper">
                    <button id="start_stop" onClick={()=>{
                        playClick()
                        props.updateRunning(!props.running)}
                        }>
                    {props.running ? "Pause" : "Start"}
                    </button>
                    <button id="reset" onClick={()=>{
                        playClick()
                        props.reset()}
                        }>⟳</button>
                </div>
                
            </div>
            
        </div>
    )
}

export default TimerComponent