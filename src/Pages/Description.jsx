// import React from "react";
import "../Styles/Description.css";
import jamImage from "./image.png"; // Ensure the image is in the public or src folder

const RecipeCard = () => {
  return (
    <div className="recipe-container">
      <h1>Strawberry & Apple Jam</h1>
      <p className="description">
        Low Fat, Fat-Free, Low in Saturated Fat, Low Cholesterol, Cholesterol-Free, Trans-fat Free,
        Sodium-Free, Low Sodium
      </p>
      <img src={jamImage} alt="Strawberry & Apple Jam" className="recipe-image" />

      <h2>Ingredients Used to Make it</h2>
      <table className="ingredients-table">
        <tbody>
          <tr><td>Strawberry</td><td>500 g</td></tr>
          <tr><td>Apples</td><td>500 g</td></tr>
          <tr><td>Lemon juice</td><td>1/4 cup</td></tr>
          <tr><td>Water</td><td>2 cups</td></tr>
          <tr><td>Sugar</td><td>1 Kg</td></tr>
        </tbody>
      </table>

      <h2>Instructions</h2>
      <ol className="instructions">
        <li>Wash, hull, and halve the strawberries.</li>
        <li>Peel, core, and quarter the apples. Then cut quarters into thin slices.</li>
        <li>Put all the ingredients, except the sugar, into a large pot.</li>
        <li>Cover and bring to a boil. Simmer until the fruit is tender.</li>
        <li>Add warmed sugar and stir until it has dissolved. Increase heat, stirring frequently, and cook until the setting point is reached.</li>
        <li>Remove from heat and let stand for 5 minutes.</li>
        <li>Pour into warm sterile jars and seal.</li>
      </ol>
    </div>
  );
};

export default RecipeCard;
