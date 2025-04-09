import React from 'react';
import { Text, View } from 'react-native';
import Container from '../../components/Container';

const TaskDetailScreen = ({route}: any) => {
  const {color, task} = route.params;
  return (
    <Container back title="Demo 01">
      <View style={{backgroundColor: color, height: 100}}>
        <Text>TaskDetailScreen</Text>
      </View>
    </Container>
  );
};

export default TaskDetailScreen;
