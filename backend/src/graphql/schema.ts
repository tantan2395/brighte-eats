import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type Lead {
        id: ID!
        name: String!
        email: String!
        mobile: String!
        postcode: String!
        interests: [String!]!
        createdAt: String!
    }

    type Query {
        leads: [Lead!]!
        lead(id: ID!): Lead
    }

    input LeadInput {
        name: String!
        email: String!
        mobile: String!
        postcode: String!
        interests: [String!]!
    }

    type Mutation {
        registerLead(input: LeadInput!): Lead!
    }
`);
