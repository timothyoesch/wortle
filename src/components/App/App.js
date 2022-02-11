import react from 'react';

import './App.css';
import "normalize.css"
import Topbar from '../Topbar/Topbar';
import Gamegrid from '../Gamegrid/Gamegrid';
import Keyboard from '../Keyboard/Keyboard';
import Gamelogic from "../../Gamelogic"

class App extends react.Component {
  constructor(props) {
    super(props)
    this.gameLogic = new Gamelogic
  }


  render() {
    return (
    <div className="App">
      <div className='appcontainer mx-auto flex flex-col h-screen justify-between'>
        <Topbar />
        <Gamegrid />
        <Keyboard gameLogic = {this.gameLogic} />
      </div>
    </div>
    );
  }
}

export default App;
