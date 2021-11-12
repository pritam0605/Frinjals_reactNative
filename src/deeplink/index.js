const config = {
  screens: {
    reset: {
      path: 'reset/:hash',
      parse: {
        hash: hash => `${hash}`,
      },
    },
    verifyemail: 'verify-email/:hash',
  },
};

const linking = {
  prefixes: ['https://www.example.com', 'example://'],
  config,
};
export default linking;
