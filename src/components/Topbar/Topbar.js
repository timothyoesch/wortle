import "./Topbar.css"
import react from "react";
import { QuestionMarkCircleIcon as HelpIcon, TrendingUpIcon as TrendIcon } from '@heroicons/react/outline'

class Topbar extends react.Component {
    render() {
        return (
            <div className="flex border-b-slate-800 border-b-2 py-2 justify-between">
                <HelpIcon className="h-7 w-7 text-slate-800 my-auto"/>
                <p className="my-auto h-fit flex uppercase font-bold text-slate-800" id="logotype">Wortle</p>
                <TrendIcon className="h-7 w-7 text-slate-800 my-auto"/>
            </div>
        )
    }
}

export default Topbar