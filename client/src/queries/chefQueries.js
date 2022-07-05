import { gql } from "@apollo/client";

const GET_CHEFS = gql`
  query getCehfs {
    chefs {
        id
        name
        email
        phone
    }
}`;

export { GET_CHEFS };