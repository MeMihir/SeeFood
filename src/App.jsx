import React, { Component } from "react";
import "./App.scss";
import Background from "./components/Background/Background";
import Card from "./components/Upload/card";
import * as tf from "@tensorflow/tfjs";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: undefined,
      img: undefined,
      result: [],
    };
    this.predict = this.predict.bind(this);
  }

  async predict(img) {
    try {
      const tensorImg = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([299, 299])
        .toFloat()
        .expandDims();
      const result = await this.state.model.predict(tensorImg).data();
      this.setState({
        result,
        img: tensorImg,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    try {
      const model = await tf.loadLayersModel("./model/model.json");
      this.setState({ model });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="area">
        <div className="App">
          <Background />
          <header className="App-header">SeeFood</header>
          <div className="card">
            <Card predict={this.predict} />
          </div>
        </div>
      </div>
    );
  }
}
