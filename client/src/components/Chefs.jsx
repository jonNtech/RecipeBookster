import { useQuery } from '@apollo/client';
import ChefRow from './ChefRow';
import {GET_CHEFS} from '../queries/chefsQueries';
import Spinner from './Spinner';



export default function Chefs() {
  const { loading, error, data } = useQuery(GET_CHEFS);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong</p>;

    return <>{!loading && !error && (
        <table className='table table-hover mt-3'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.chefs.map(chef => (
                    <ChefRow key={chef.id} client={chef}/>
                ))}
            </tbody>
        </table>
    )}</> 
}
