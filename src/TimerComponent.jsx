import { useEffect } from "react"
function TimerComponent(props){

    // Helper: Convert seconds to mm:ss
    function formatTime(seconds) {
        const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
        const ss = String(seconds % 60).padStart(2, '0')
        return `${mm}:${ss}`
    }
    return (
        <div id="timer-wrapper">
            <p id="timer-label">{props.label}</p>
            <p id="time-left">{formatTime(props.timeLeft)}</p>
            <button id="start_stop" onClick={()=>props.updateRunning(!props.running)}>
                {props.running ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={()=>props.reset()}>Reset</button>
        </div>
    )
}

export default TimerComponent