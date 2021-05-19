import React, {Component} from 'react';
import Img from "./assets/640.png";

class App extends Component {
    render() {
        return (
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <img className="h-12 w-12" src={Img} alt=""/>
                </div>
                <div>
                    <div className="text-xl font-medium text-black">ChitChat</div>
                    <p className="text-gray-500">You have a new message!</p>
                </div>
            </div>
        );
    }
}

export default App;