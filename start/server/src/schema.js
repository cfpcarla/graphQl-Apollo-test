// Your GraphQL schema defines what types of data a client can 
// read and write to your data graph. Schemas are strongly typed, 
// which unlocks powerful developer tooling.

// Fetch a list of all upcoming rocket launches
// Fetch a specific launch by its ID
// Log in the user
// Book a launch for a logged-in user
// Cancel a previously booked launch for a logged-in user

// If a declared field's type is in [Square Brackets], it's an array 
// of the specified type. If an array has an exclamation point after 
// it, the array cannot be null, but it can be empty.

const { gql } = require('apollo-server')
const typeDefs = gql `
type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Rocket {
    id: ID!
    name: String
    type: String
}

type User {
    id: ID!
    email: String!
    trips: [Launch]!   
    token: String
}

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Query {
    launches( # replace the current launches query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }
  
  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
`;

module.exports = typeDefs;