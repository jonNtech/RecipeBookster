import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_RECIPE} from '../mutations/recipeMutations';
import { GET_RECIPES } from '../queries/recipeQueries';
import { GET_CHEFS } from '../queries/chefQueries';

export default function AddRecipeModal(){
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ ingredients, setIngredients ] = useState('');
    const [ instructions, setInstructions ] = useState('');
    const [ steps, setSteps ] = useState('');
    const [ chefId, setChefId ] = useState('');

    const [ addRecipe ] = useMutation(ADD_RECIPE, {
        variables: { name, description, ingredients, instructions, steps, chefId },
        update(cache, { data: { addRecipe } }) {
            const { recipes } = cache.readQuery({ query: GET_RECIPES });
            cache.writeQuery({
                query: GET_RECIPES,
                data: { recipes: [...recipes, addRecipe] },
            });
        }    
});

//get chefs for select
const {loading, error, data} = useQuery(GET_CHEFS);

const onSumbit = (e) => {
    e.preventDefault();
    
    if (name === '' || description === '' || ingredients === '' || instructions === '' || steps === '' || chefId === '') {
        return alert('Please fill out all fields');
    }

    addRecipe(name, description, ingredients, instructions, steps, chefId);

    setName('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setSteps('');
    setChefId('');
} 

    if (loading) return null;
    if (error) return `Error! ${error.message}`;

return (
    <>
        {!loading && !error && (
            <>
                <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#addRecipeModal"
                    type='button'
                >
                    <div className="d-flex justify-content-center">
                        <FaList className="icon" />
                        <div>New Recipe</div>
                    </div>
                </button>

                <div 
                    className='modal fade'
                    id='addRecipeModal'
                    aria-labelledby='addRecipeModalLabel'
                    aria-hidden='true'
                >
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='addRecipeModalLabel'>Add Recipe</h5>
                                <button
                                    type='button'
                                    className='btn-close'
                                    data-dismiss='modal'
                                    aria-label='Close'
                                ></button>
                            </div>
                            <div className='modal-body'>
                                <form onSubmit={onSumbit}>
                                    <div className='mb-3'>
                                        <label className='form-label'>Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='name'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Description</label>
                                        <textarea
                                            className='form-control'
                                            id='description'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Ingredients</label>
                                        <textarea
                                            className='form-control'
                                            id='ingredients'
                                            value={ingredients}
                                            onChange={e => setIngredients(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Instructions</label>
                                        <textarea
                                            className='form-control'
                                            id='instructions'
                                            value={instructions}
                                            onChange={e => setInstructions(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Steps</label>
                                        <textarea
                                            className='form-control'
                                            id='steps'
                                            value={steps}
                                            onChange={e => setSteps(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Chef</label>
                                        <select
                                            className='form-control'
                                            id='chefId'
                                            value={chefId}
                                            onChange={e => setChefId(e.target.value)}
                                        >
                                            <option value=''>Select Chef</option>
                                            {data.chefs.map(chef => (
                                                <option key={chef.id} value={chef.id}>
                                                    {chef.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button 
                                        type='submit'
                                        className='btn btn-primary'
                                        data-bs-dismiss='modal'
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>                                    
                </div>
            </>
        )}
    </>
)}  

