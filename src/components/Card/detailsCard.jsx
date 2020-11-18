import React from "react";
import "./detailsCard.scss";

export default function detailsCard(props) {
  return (
    <div className="FoodDetails">
      <h1>{props.data.name.toUpperCase()}</h1>
      <h3>{(props.data.confidence * 100).toFixed(2)} %</h3>
      <div className="nutrition">
        <span>Calories</span>
        <span>
          {props.data.calories.confidenceRange95Percent.min} to{" "}
          {props.data.calories.confidenceRange95Percent.max}
        </span>
        <span>{props.data.calories.unit}</span>
      </div>
      <div className="nutrition">
        <span>Fats</span>
        <span>
          {props.data.fat.confidenceRange95Percent.min} to{" "}
          {props.data.fat.confidenceRange95Percent.max}
        </span>
        <span>{props.data.fat.unit}</span>
      </div>
      <div className="nutrition">
        <span>Proteins</span>
        <span>
          {props.data.protein.confidenceRange95Percent.min} to{" "}
          {props.data.protein.confidenceRange95Percent.max}
        </span>
        <span>{props.data.protein.unit}</span>
      </div>
      <div className="nutrition">
        <span>Carbs</span>
        <span>
          {props.data.carbs.confidenceRange95Percent.min} to{" "}
          {props.data.carbs.confidenceRange95Percent.max}
        </span>
        <span>{props.data.carbs.unit}</span>
      </div>
    </div>
  );
}
