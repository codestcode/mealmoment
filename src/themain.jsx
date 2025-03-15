import React from 'react';
import chef from 'D:/habeba/habeba/new work of DOM/chef-clu/src/img/food-delivery.png';
import { getRecipeFromGemini } from './Api.js';
import ListShow from './listshow.jsx';
import Cards from '../cards.jsx';

export default function Main({ getRecipe = getRecipeFromGemini }) {
  const [ingredients, setIngredients] = React.useState([]);
  const [ishown, setisshown] = React.useState(""); // Fixed typo: "ishown" -> "isShown" in setter for consistency

  const ingredientsListItems = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li> // Changed key to index; original used ingredient string
  ));

  function submitting(formData) {
    // event.preventDefault() //^ Not needed with action prop in React 19
    // const formData = new FormData(event.currentTarget) //^ collects the form data. (Not needed, passed automatically)
    // const newIngredient = formData.get("ingredient") //^ retrieves the input value (Moved below)

    // //? Submit the info to a backend (You can add this later if needed)

    //* instead of the above, we can use the following:
    //* go to our form and add the attribute action={submitting} or the name of our function
    //* that method works to collect the form data & retrieve the input value & prevent the default behavior
    //* so we no longer need them anymore

    const newIngredient = formData.get("ingredient").trim(); //^ retrieves the input value, added trim()
    if (newIngredient) { // Only add non-empty inputs
      setIngredients((prev) => [...prev, newIngredient]); //^ adds the new ingredient to the state.
      console.log(ingredients); // Note: This logs the current state, not the updated one
    }
  }

  async function flipbutton() {
    const recipeMarkdown = await getRecipe(ingredients);  // Using prop
    setisshown(recipeMarkdown);
  }

  return (
    <>
    
      <div className="form-container">
          <header>    
                 <img src={chef} alt="chef-logo" className="chef-logo" width="30px" />
                <h1>MealMoment</h1>
                </header>
                <h2 className='head-text'>
  LET THE MAGIC
  <span>LET THE MAGIC</span>
  <span>LET THE MAGIC</span>
  <span>HAPPEN</span>
</h2>
<h3 className='word-text'>Your Meal, This Moment.</h3>
        <form
          action={submitting} //^ this is the function that will be called when the form is submitted.
          //^ the action attribute is used to specify the URL where the form data should be sent.
        >
          <input
            className="form-input"
            type="text"
            placeholder="e.g., eggs" 
            aria-label="Add ingredient"
            name="ingredient" //! the name attribute is important, used to send the name of form data that we will use above
          />
          <button type="submit" className="ing-button"
          >
            
    +Add Ingredians
    </button> 
        </form>
      </div>

      <div>
          <div className='ingre-container'>
            <Cards/>
        {ingredients.length > 0 && (
          <section className="ingredients-section">
            <h2>Ingredients on hand:</h2>
            <ul
              className="ingredients-list"
              aria-live="polite"
            >
              {ingredientsListItems}
            </ul>
          </section>
        )}</div>

        {ingredients.length >= 4 && !ishown && (
          <div className="message">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients</p>
            </div>
            <button className="messsage-button" onClick={flipbutton}>
              
            <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
    </svg>

    <span class="text">Generate</span>

             </button>
          </div>
        )}
      </div> 
      {ishown && <ListShow ishown={ishown} />}

    </>
  );

  //* the "&&" for the optional rendering The ingredients list will only be displayed if there are ingredients in the list.
  //^ we surround our element with {} then wites the condition

  //* we can do the optional renderin  by the ternary operator
  //^ {ingredients.length ? <section> </section> : null}
}