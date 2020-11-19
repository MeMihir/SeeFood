import React, { Component } from "react";
import "./App.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Background from "./components/Background/Background";
import Card from "./components/Card/uploadCard";
import Details from "./components/Card/detailsCard";
import Loading from "./components/loading/loading";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { class_mapping } from "./class_mapping";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: undefined,
      img: undefined,
      result: [],
      top5: [],
      loading: true,
    };
    this.predict = this.predict.bind(this);
  }

  async predict(img) {
    try {
      this.setState({ loading: true });
      const tensorImg = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([299, 299])
        .toFloat()
        .expandDims();
      const result = await this.state.model.predict(tensorImg).data();
      const top5 = this.findIndicesOfMax(result, 5);
      for (let indx = 0; indx < top5.length; indx++) {
        const { data } = await axios.get(
          "https://api.spoonacular.com/recipes/guessNutrition",
          {
            params: {
              title: class_mapping[top5[indx]].split("_").join(" "),
              apiKey: process.env.REACT_APP_FOODKEY,
            },
          }
        );
        data.name = class_mapping[top5[indx]];
        data.confidence = result[top5[indx]];
        top5[indx] = data;
      }

      this.setState({
        result,
        top5,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  findIndicesOfMax(inp, count = 5) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
      outp.push(i);
      if (outp.length > count) {
        outp.sort((a, b) => {
          return inp[b] - inp[a];
        });
        outp.pop();
      }
    }
    return outp;
  }

  async componentDidMount() {
    try {
      const model = await tf.loadLayersModel("./model/model.json");
      this.setState({ model, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  render() {
    return (
      <div className="area">
        {this.state.loading ? <Loading /> : null}
        <div className="App">
          <Background />
          <header className="App-header">SeeFood</header>
          <h4>its like Shazam for Food!!</h4>
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
              <div className="carousel">
                <Carousel
                  infiniteLoop={true}
                  emulateTouch={true}
                  swipeable={true}
                >
                  {this.state.top5.map((item) => (
                    <Details data={item} />
                  ))}
                </Carousel>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
