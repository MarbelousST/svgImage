import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageSvg from "./components/imageSvg/ImageSvg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ImageSvg src="svg.svg" />
      </div>
    );
  }
}

export default App;
