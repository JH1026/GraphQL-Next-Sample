import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    postedLinks: [Link!]!
  }

  type Link {
    id: ID!
    title: String!
    url: String!
    postedBy: User!
    favoritePoint: Int!
    linkRelation: [LinkRelation!]!
  }

  type FavoriteResult {
    currentPoint: Int!
    isFavorite: Int!
  }

  type LinkRelation {
    id: ID!
    title: String!
    links: [Link!]!
  }

  type Query {
    allUsers: [User!]!
    
    allUserLinks(
      userId: String!
    ): [Link!]!

    allFavoriteLinks(
      userId: String!
    ): [Link!]!
  }

  type Mutation {

    postLink(
      title: String!
      url: String!
    ): Link!

    toggleFavoriteLink(
      linkId: String!
    ): FavoriteResult!

  }

  
`;

export default typeDefs;
