import react from "react";
import "./Gamegrid.css"
import Gamerow from "../Gamerow/Gamerow"

class Gamegrid extends react.Component {
    render() {
        return(
            <div id="gameBox" className="mx-auto flex flex-col gap-2">
                <Gamerow row={1} />
                <Gamerow row={2} />
                <Gamerow row={3} />
                <Gamerow row={4} />
                <Gamerow row={5} />
                <Gamerow row={6} />
            </div>
        )
    }
}

export default Gamegrid