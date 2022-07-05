import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_RECIPE } from "../queries/recipeQueries";
import { UPDATE_RECIPE } from "../mutations/recipeMutations";

export default function EditRecipeForm({ recipe }) {
    const [name, setName] = useState(recipe.name);
    const [description, setDescription] = useState(recipe.description);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);
    const [steps, setSteps] = useState(recipe.steps);
    const [chef, setChef] = useState(recipe.chef);

    const [updateRecipe] = useMutation(UPDATE_RECIPE, {
        variables: {
            id: recipe.id, name, description, ingredients, instructions, steps},
        refetchQueries: [{ query: GET_RECIPE, variables: { id: recipe.id } }]
    });

    const onSubmit = e => {
        e.preventDefault();
        if(!name || !description || !ingredients || !instructions || !steps) {
            alert("Please fill out all fields");
            return;
        }
        
        updateRecipe();
    }

    return (
        <div className='mt-5'>
        <h3>Update Recipe Details</h3>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea
              className='form-control'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='mb-3'>
            <label className='form-label'>ingredients</label>
            <textarea
                className='form-control'
                id='ingredients'
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>
            <div className='mb-3'>
            <label className='form-label'>instructions</label>
            <textarea
                className='form-control'
                id='instructions'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
            </div>
            <div className='mb-3'>
            <label className='form-label'>steps</label>
            <textarea
                className='form-control'
                id='steps'
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
            ></textarea>
            </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  } 