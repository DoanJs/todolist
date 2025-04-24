const config = {
  screens: {
    HomeScreen: {
      path: 'HomeScreen',
    },
  },
};

const linking: any = {
  prefixes: ['todolist://app'],
  config,
};

export default linking;
