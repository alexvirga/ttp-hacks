import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import config from "./config";
import Home from "./Components/Home";

import { BrowserRouter } from "react-router-dom";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Home />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
