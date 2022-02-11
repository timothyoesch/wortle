import react from "react";
import Keyrow from "../Keyrow/Keyrow";
import Key from "../Key/Key";

const rows = {
    1 : ["q","w","e","r","t","z","u","i","o","p","ü"],
    2 : ["a","s","d","f","g","h","j","k","l","ö","ä"],
    3 : ["enter","y","x","c","v","b","n","m", "delete"]
}

class Keyboard extends react.Component {
    render() {
        const gameLogic = this.props.gameLogic
        return(
            <div className="flex flex-col gap-1 pb-2">
                {Object.keys(rows).map(function(key, index) {
                    return(
                        <Keyrow key={index}>
                            {rows[key].map(function(index){
                                return(
                                    <Key data={index} onClick={gameLogic.guessLetter} key={index} />
                                )
                            })}
                        </Keyrow>
                    )
                })}
            </div>
        )
    }
}

export default Keyboard