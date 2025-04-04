import React, {useState} from 'react';
import Container from '../../components/Container';
import InputComponent from '../../components/InputComponent';
import SectionComponent from '../../components/SectionComponent';
import {TaskModel} from '../../models/TaskModel';
import {Button, View} from 'react-native';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import RowComponent from '../../components/RowComponent';
import SpaceConponent from '../../components/SpaceConponent';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);

  const handleChangeValue = (id: string, value: string | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = () => {
    console.log(taskDetail);
  };

  return (
    <Container back title="Add new task">
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="Title"
          placeholder="Title of task"
          allowClear
        />
        <InputComponent
          value={taskDetail.description}
          onChange={val => handleChangeValue('description', val)}
          title="Description"
          placeholder="Title of task"
          allowClear
          multible
          numberOfLine={3}
        />

        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
          placeholder="Choice"
          type="date"
          title="Due Date"
        />
        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              onSelect={val => handleChangeValue('start', val)}
              placeholder="Choice"
              type="time"
              title="Start"
            />
          </View>
          <SpaceConponent width={10} />
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={val => handleChangeValue('end', val)}
              placeholder="Choice"
              type="time"
              title="End"
            />
          </View>
        </RowComponent>
      </SectionComponent>

      <SectionComponent>
        <Button onPress={handleAddNewTask} title={'Save'} />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
