import { gql } from "@apollo/client";

const ADD_CHEF = gql`
    mutation addChef($name: String!, $email: String!, $password: String!) {
        addChef(name: $name, email: $email, password: $password) {
            id
            name
            email
            phone
        }
    }
`;

const DELETE_CHEF = gql`
    mutation deleteChef($id: ID!) {
        deleteChef(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

export { ADD_CHEF, DELETE_CHEF };