import react from "react";
import {BackspaceIcon} from '@heroicons/react/solid';
import "./Key.css"

class Key extends react.Component {
    constructor(props){
        super(props)

        if (this.props.data === "enter" || this.props.data === "delete") {
            this.width = "w-16"
        } else {
            this.width = "w-10"
        }

        if (this.props.data === "delete") {
            this.display = <BackspaceIcon className="w-8 mx-auto"/>
            this.padding = "py-1"
        } else {
            this.display = this.props.data
            this.padding = "py-5"
        }

        if (this.props.data === "delete" || this.props.data === "enter") {
            this.specialChar = true
        } else {
            this.specialChar = false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onClick(this.props.data, this.specialChar)
    }

    render() {
        return(
            <div className={`justify-center flex bg-gray-200`}>
                <button
                    className={`${this.width} ${this.padding} font-bold text-slate-800 uppercase${(this.specialChar) ? " specialChar" : ""} keyboardkey`}
                    onClick={this.handleClick}
                    data-key-id={this.props.data}
                    >{this.display}
                </button>
            </div>
        )
    }
}

export default Key