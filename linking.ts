const config = {
  screens: {
    HomeScreen: {
      path: 'HomeScreen',
    },
    TaskDetailScreen: {
      path: 'task-detail/:id',
    },
  },
};

const linking: any = {
  prefixes: ['todolist://app'],
  config,
};

export default linking;
