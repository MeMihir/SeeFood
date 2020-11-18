import React from "react";
import axios from "axios";
import './detailsCard.scss'

export default function detailsCard(props) {
  // const { data } = await axios.get('https://api.spoonacular.com/recipes/guessNutrition', {
  // 	title:props.name,
  // 	apiKey: process.env.REACT_APP_FOODKEY
  // })

  const data = {
    recipesUsed: 25,
    calories: {
      value: 410.0,
      unit: "calories",
      confidenceRange95Percent: {
        min: 316.98,
        max: 466.73,
      },
      standardDeviation: 191.01,
    },
    fat: {
      value: 21.0,
      unit: "g",
      confidenceRange95Percent: {
        min: 16.5,
        max: 25.9,
      },
      standardDeviation: 11.99,
    },
    protein: {
      value: 13.0,
      unit: "g",
      confidenceRange95Percent: {
        min: 9.86,
        max: 19.98,
      },
      standardDeviation: 12.92,
    },
    carbs: {
      value: 44.0,
      unit: "g",
      confidenceRange95Percent: {
        min: 28.42,
        max: 45.18,
      },
      standardDeviation: 21.38,
    },
  };

  return (
    <div className="FoodDetails" >
      <h1>{props.name.toUpperCase()}</h1>
			<h3>{(props.confidence*100).toFixed(2)} %</h3>
      <div className='nutrition' >
        <span>Calories</span>
        <span>{data.calories.confidenceRange95Percent.min} to {data.calories.confidenceRange95Percent.max}</span>
        <span>{data.calories.unit}</span>
      </div>
      <div className='nutrition' >
        <span>Fats</span>
        <span>{data.fat.confidenceRange95Percent.min} to {data.fat.confidenceRange95Percent.max}</span>
        <span>{data.fat.unit}</span>
      </div>
      <div className='nutrition' >
        <span>Proteins</span>
        <span>{data.protein.confidenceRange95Percent.min} to {data.protein.confidenceRange95Percent.max}</span>
        <span>{data.protein.unit}</span>
      </div>
      <div className='nutrition' >
        <span>Carbs</span>
        <span>{data.carbs.confidenceRange95Percent.min} to {data.carbs.confidenceRange95Percent.max}</span>
        <span>{data.carbs.unit}</span>
      </div>
    </div>
  );
}
