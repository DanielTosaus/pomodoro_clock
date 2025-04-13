import { useEffect, useState, useRef } from 'react'
import './App.css'
import TimeSelector from './TimeSelector'
import TimerComponent from './TimerComponent'

function App() {

  const [pomodoro_count, setPomodoroCount] = useState (0)

  const [break_time, setBreakTime] = useState(5)
  const [session_time, setSessionTime] = useState(25)

  const [current_label, setCurrentLabel] = useState("Session")
  const [time_left, setTimeLeft] = useState(session_time)
  const [running, setRunning] = useState(false)

  const timerRef = useRef(null)
  // Sync time_left with session_time when user updates session and timer is not running
  useEffect(() => {
    if (!running && current_label === "Session") {
      setTimeLeft(session_time * 60)
    }
  }, [session_time])

  // Sync time_left with break_time when user updates session and timer is not running
  useEffect(() => {
    if (!running && current_label === "Break") {
      setTimeLeft(break_time * 60)
    }
  }, [break_time])

  const timeoutRef = useRef(null)
   // Main timer logic
   useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if(prev > 0){
            return prev - 1
          }
          else {
            // Wait 1 second on 00:00 before switching modes
            clearInterval(timerRef.current)
            playBeep()
            timeoutRef.current = setTimeout(() => {
              // Time's up: switch between Session <-> Break
              const nextLabel = current_label === "Session" ? "Break" : "Session"
              const nextTime = (nextLabel === "Session" ? session_time : break_time) * 60
              if(nextLabel == "Session"){
                setPomodoroCount(pomodoro_count + 1)
              }
              setCurrentLabel(nextLabel)
              setTimeLeft(nextTime)
              setRunning(true)
            }, 1000)
            return 0
          }
        })
      }, 1000)
    }

    // Cleanup interval when stopped or component unmounts
    return () => clearInterval(timerRef.current)
  }, [running, current_label, session_time, break_time])

  function playBeep(){
    const audio_beep = document.getElementById("beep")
      if (audio_beep){
        audio_beep.currentTime = 0; // Restart audio from the beginning
        audio_beep.volume = 0.2;
        audio_beep.play();
      }
  }
  function stopBeep(){
    const audio_beep = document.getElementById("beep")
      if (audio_beep){
        audio_beep.pause();
        audio_beep.currentTime = 0; // Restart audio from the beginning
      }
  }
  function reset_state(){
    stopBeep()
    clearInterval(timerRef.current)
    clearTimeout(timeoutRef.current)
    setBreakTime(5)
    setSessionTime(25)
    setCurrentLabel("Session")
    setTimeLeft(25 * 60)
    setRunning(false)
  }
  return (
    <>
      <h1>25 + 5 Clock</h1>
      <p>Pomodoros Completed in this Session: {pomodoro_count}</p>
      <TimeSelector
        name="Break"
        value={break_time}
        running={running}
        updateValue={setBreakTime}
      />
      <TimeSelector
        name="Session"
        value={session_time}
        running={running}
        updateValue={setSessionTime}
      />
      <TimerComponent
        label={current_label}
        timeLeft={time_left}
        running={running}
        updateRunning={setRunning}
        reset={reset_state}
      />
      <audio id="beep" src="/gong.mp3"></audio>
      <p>Designed by me</p>
    </>
  )
}

export default App
