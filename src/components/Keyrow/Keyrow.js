import react from "react";

class Keyrow extends react.Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className="flex gap-1 justify-items-stretch mx-auto">
                {this.props.children}
            </div>
        )
    }
}

export default Keyrow