export const UserTypeDef = `
    type User {
        id: Int!
        username: String!
        firstName: String
        lastName: String
        roleId: Int!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input SignUpInput {
        username: String!
        password: String!
        firstName: String
        lastName: String
        roleId: Int!
    }

    input UpdateInput {
        username: String
        firstName: String
        lastName: String
        roleId: Int
    }

    type Query {
        login(input: LoginInput!): String!
        authenticate: Boolean!
        getUsers: [User]
        getUserById(id: Int!): User
    }

    type Mutation {
        signup(input: SignUpInput!): User!
        updateUserById(id: Int!, input: UpdateInput): User!
        deleteUserById(id: Int!): User!
    }
`;
