import React, { Component } from "react";
import "./App.scss";
import Background from "./components/Background/Background";
import Card from "./components/Card/uploadCard";
import Details from "./components/Card/detailsCard";
import * as tf from "@tensorflow/tfjs";
import { class_mapping } from "./class_mapping";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: undefined,
      img: undefined,
      result: [],
      top5: [],
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
      const top5 = this.findIndicesOfMax(result, 5);
      this.setState({
        result,
        top5,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findIndicesOfMax(inp, count = 5) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
      outp.push(i); // add index to output array
      if (outp.length > count) {
        outp.sort((a, b) => {
          return inp[b] - inp[a];
        }); // descending sort the output array
        outp.pop(); // remove the last index (index of smallest element in output array)
      }
    }
    return outp;
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
          <h4>its like Shazaam for Food!!</h4>
          <div className="Cards">
            <div className="upload-card">
              <Card
                predict={this.predict}
                newImage={() => {
                  this.setState({
                    img: undefined,
                    result: [],
                    top5: [],
                  });
                }}
              />
            </div>
            {this.state.top5.length > 0 ? (
              <Details
                name={class_mapping[this.state.top5[0]].split("_").join(" ")}
                confidence={this.state.result[this.state.top5[0]]}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
