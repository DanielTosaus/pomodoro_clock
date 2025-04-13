
function TimeSelector(props){

    function increase(){
        if(props.value < 60 && !props.running){
            props.updateValue(props.value + 1)
        }
        
    }
    function decrease(){
        if(props.value > 1 && !props.running){
            props.updateValue(props.value - 1)
        }
    }
    return (
        <>
        <div id={props.name.toLowerCase()+"-label"}>
            <p>{props.name} Length</p>
            <button id={props.name.toLowerCase()+"-increment"} onClick={() => increase()}>+</button>
            <p id={props.name.toLowerCase()+"-length"}>{props.value}</p>
            <button id={props.name.toLowerCase()+"-decrement"} onClick={() => decrease()}>-</button>
            
            
        </div>
        </>
    )
    
}
export default TimeSelector