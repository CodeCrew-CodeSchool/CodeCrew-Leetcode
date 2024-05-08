const util = require('util');

// Mock appConfig.js to use a fake Redis and MongoDB connection string
jest.mock('../src/config/appConfig', () => ({
  REDIS_CONNECTION_STRING: 'redis://localhost:6379',
  MONGO_CONNECTION_STRING: 'mongodb://1234@cluster0.nnbdzbq.mongodb.net/leetcode'
}));

// Import the async-redis library to wrap the Redis client for asynchronous operations

// Mock the redisConfig.js to use the mocked Redis client with async support
jest.mock('../src/config/redisConfig', () => {
  const asyncRedis = require('async-redis');

  const redisMock = require('redis-mock');
  const client = redisMock.createClient();

  // Wrap the redis-mock client with async-redis to enable async methods
  const asyncClient = asyncRedis.decorate(client);

  return asyncClient;
});

jest.mock('mongodb', () => {
  const mockMongoClient = {
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn((query) => {
          // Handle the query parameter to return different mocks
          return {
            toArray: jest.fn().mockImplementation(() => {
              // Check the query to decide what to return
              if (query._id && query._id.$in) {
                // Mock response for getChallengesByIds
                return Promise.resolve(query._id.$in.map(id => ({ _id: id, name: 'Sample Challenge' })));
              }
              // Default mock response for getAllChallenges
              return Promise.resolve([{ _id: 'general', name: 'General Challenge' }]);
            })
          };
        }),
        deleteOne: jest.fn((query) => {
          // Simulate deletion response based on the presence of the _id in the query
          if (query._id === 'nonexistent') {
            return Promise.resolve({ deletedCount: 0 });

          }else if (query._id) {
            return Promise.resolve({ deletedCount: 1 });
          }
          return Promise.resolve({ deletedCount: 0 });

        }),
        findOneAndUpdate: jest.fn((query, update, options) => {
          // Simulate update response based on the query and update data
          if (query._id === 'nonexistent') {
            return Promise.resolve({ value: null });
          } else if (query._id && update.$set) {
            return Promise.resolve({
              value: { _id: query._id, ...update.$set }, // Mocking the returned document after update
            });
          }
          return Promise.resolve({ value: null });
        })
      })
    }),
    connect: jest.fn(),
    close: jest.fn(),
  };


  return {
    MongoClient: jest.fn(() => mockMongoClient),
    ObjectId: jest.fn((id) => id)
  };
});