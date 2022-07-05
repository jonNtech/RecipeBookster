import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ChefInfo from '../components/ChefInfo';
import DeleteRecipeButton from '../components/DeleteRecipeButton';
import EditRecipeForm from '../components/EditRecipeForm';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../queries/recipeQueries';

export default function Recipe() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RECIPE, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.recipe.name}</h1>
          <p>{data.recipe.description}</p>
            <p>{data.recipe.chef.name}</p>
          

          <ChefInfo chef={data.recipe.chef} />

          <EditRecipeForm recipe={data.recipe} />

          <DeleteRecipeButton recipeId={data.recipe.id} />
        </div>
      )}
    </>
  );
}