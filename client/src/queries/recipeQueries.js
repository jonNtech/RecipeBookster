import { gql } from '@apollo/client'


const GET_RECIPES = gql`
    query getRecipes {
        recipes {
            id
            name
            status
        }
    }
`
const GET_RECIPE = gql`
    query getRecipe($id:ID!) {
        recipe(id: $id) {
            id
            name
            description
            ingredients
            steps
            chefId
        }
    }
`

export { GET_RECIPE, GET_RECIPES }