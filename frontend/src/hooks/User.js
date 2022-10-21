import {gql, useQuery} from "@apollo/client"

export const AUTHENTICATE_USER_QUERY = gql`
    query AUTHENTICATE_USER_QUERY {
        authenticatedItem {
        ... on User {
            id
            name
            email
        }
        }
    }
`;

export const useUser = () => {
    const { data } = useQuery(AUTHENTICATE_USER_QUERY, {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-and-network"
    });
    return data;
}
