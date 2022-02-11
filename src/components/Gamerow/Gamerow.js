import react from "react";
import Gamefield from "../Gamefield/Gamefield"

class Gamerow extends react.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div data-row-id={`${this.props.row}`} className="flex items-stretch gap-2 gamerow">
                <Gamefield row={this.props.row} field={1} />
                <Gamefield row={this.props.row} field={2} />
                <Gamefield row={this.props.row} field={3} />
                <Gamefield row={this.props.row} field={4} />
                <Gamefield row={this.props.row} field={5} />
            </div>
        )
    }
}

export default Gamerow