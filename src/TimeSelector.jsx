
function TimeSelector(props){

    function playClick(){
        const audio_click = document.getElementById("click")
        if (audio_click){
            audio_click.currentTime = 0; // Restart audio from the beginning
            audio_click.volume = 0.1;
            audio_click.play();
        }
    }
    function increase(){
        if(props.value < 60 && !props.running){
            playClick()
            props.updateValue(props.value + 1)
        }
        
    }
    function decrease(){
        if(props.value > 1 && !props.running){
            playClick()
            props.updateValue(props.value - 1)
        }
    }
    return (
        <>
        <div className="time-selector" id={props.name.toLowerCase()+"-label"}>
            <p>{props.emoji} {props.name} Length</p>
            <button id={props.name.toLowerCase()+"-increment"} onClick={() => increase()}>▲</button>
            <p id={props.name.toLowerCase()+"-length"}>{props.value}</p>
            <button id={props.name.toLowerCase()+"-decrement"} onClick={() => decrease()}>▼</button>
        </div>
        </>
    )
    
}
export default TimeSelector