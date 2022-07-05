import { gql } from "@apollo/client";

const ADD_RECIPE = gql`
    mutation addRecipe($name: String!, $description: String!, $ingredients: String!,
        $steps: String!, $chefId: ID!) {
        addRecipe(name: $name, description: $description, ingredients: $ingredients,
            steps: $steps, chefId: $chefId) {
            id
            name
            description
            ingredients
            steps
            chefId
        }
    }
`;

const DELETE_RECIPE = gql`
    mutation deleteRecipe($id: ID!) {
        deleteRecipe(id: $id) {
            id
        }
    }
`;

const UPDATE_RECIPE = gql`
    mutation updateRecipe($id: ID!, $name: String!, $description: String!, $ingredients: String!, $steps: String!, $chefId: ID!) {
        updateRecipe(id: $id, name: $name, description: $description, ingredients: $ingredients, steps: $steps, chefId: $chefId) {
            id
            name
            description
            ingredients
            steps
            chefId
        }
    }
`;

export { ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE };
