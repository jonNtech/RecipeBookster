import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../queries/recipeQueries';
import RecipeCard from './RecipeCard';

export default function Recipes() {
    const { loading, error, data } = useQuery(GET_RECIPES);
    if (loading) return <Spinner />;
    if (error) return <p>Error :(</p>;
    return (
        <div className="row mt-5">
        {data.recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        </div>
    );
}