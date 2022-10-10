// Code from: https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/#static-rendering

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    cache: new InMemoryCache(),
});

export default client;