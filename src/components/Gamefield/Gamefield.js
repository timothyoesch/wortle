import react from "react";
import "./Gamefield.css"

class Gamefield extends react.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div data-field-id={`${this.props.row}-${this.props.field}`} className="flex-1 border-2 border-slate-800 gamefield">
                <div className="aspect-w-1 aspect-h-1 relative">
                    <div
                    className="absolute top-0 left-0 w-full h-full fieldcontainer flex justify-center">
                        <p className="my-auto text-2xl font-bold uppercase"></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gamefield