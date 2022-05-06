import {createApolloServer} from 'meteor/apollo';
import {makeExecutableSchema} from 'graphql-tools';

import typeDefs from '/imports/api/GraphQL/schemas';
import resolvers from '/imports/api/GraphQL/resolvers';

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

createApolloServer({
	schema,
});
