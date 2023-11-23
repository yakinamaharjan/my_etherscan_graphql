const { ApolloServer } = require("apollo-server"); // Import Apollo Server 
const { importSchema } = require("graphql-import"); // Import graphql-import to load schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom Ether DataSource

const typeDefs = importSchema("./schema.graphql"); // Load schema

require("dotenv").config(); // Load environment variables

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ether price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({ // Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({ // Setup data sources
    ethDataSource: new EtherDataSource(), 
  }), 
});

server.timeout = 0; 
server.listen("9000").then(({ url }) => { // Start Apollo Server
  console.log(`🚀 Server ready at ${url}`); 
});
