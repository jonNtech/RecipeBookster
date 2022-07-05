import { gql } from "@apollo/client";

const Add_CHEF = gql`
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

export { Add_CHEF, DELETE_CHEF };