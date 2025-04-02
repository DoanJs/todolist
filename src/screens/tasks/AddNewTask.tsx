import React, {useState} from 'react';
import Container from '../../components/Container';
import InputComponent from '../../components/InputComponent';
import SectionComponent from '../../components/SectionComponent';
import {TaskModel} from '../../models/TaskModel';
import {Button} from 'react-native';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: '',
  end: '',
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
          placeholder='Choice'
          type='date'
          title='Due Date'
        />
      </SectionComponent>

      <SectionComponent>
        <Button onPress={handleAddNewTask} title={'Save'} />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
