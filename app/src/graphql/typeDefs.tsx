import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    userId: String!
    postCount: Int!
    postedLinks: [Link!]!
  }

  type Link {
    id: ID!
    title: String!
    url: String!
    postedBy: User!
    favoritePoint: Int!
    userStatus: Boolean!
  }

  type LinkInfo {
    link: Link!
    favUsers: [User!]!
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

    searchLink(
      word: String!
      count: Int!
    ): [Link!]!

    linkInfo(
      linkId: String!
    ): LinkInfo
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
