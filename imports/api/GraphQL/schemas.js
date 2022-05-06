export default typeDefs = [`
	type User {
		id: Int!
		username: String!
	}

	type Query {
		searchUser(username: String): [User]
	}

	schema {
		query: Query
	}
`];
