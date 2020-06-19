import React, { Component } from "react";
import "./App.css";
import AuthRouter from "./Components/AuthRouter";
import { BrowserRouter } from "react-router-dom";



class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
          <AuthRouter />
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
