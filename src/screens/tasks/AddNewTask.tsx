import {addDoc, collection, getDocs} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {db} from '../../../firebaseConfig';
import ButtonComponent from '../../components/ButtonComponent';
import Container from '../../components/Container';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import DropdownPicker from '../../components/DropdownPicker';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {SelectModel} from '../../models/SelectModel';
import {Attachment, TaskModel} from '../../models/TaskModel';

import UploadFileComponent from '../../components/UploadFileComponent';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  attachments: [],
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handlegetAllUsers();
  }, []);

  const handlegetAllUsers = async () => {
    await getDocs(collection(db, 'users'))
      .then(snap => {
        if (snap.empty) {
          console.log(`Users data not found`);
        } else {
          const items: SelectModel[] = [];

          snap.forEach(item => {
            items.push({
              label: item.data().name,
              value: item.id,
            });
          });

          setUsersSelect(items);
        }
      })
      .catch((error: any) =>
        console.log(`Can not get all users by ${error.message}`),
      );
  };

  const handleChangeValue = (
    id: string,
    value: string | string[] | Date | Attachment[],
  ) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    setIsLoading(true);
    await addDoc(collection(db, 'tasks'), {...taskDetail, attachments})
      .then(() => {
        console.log('New task added!!!');
        navigation.goBack();
      })
      .catch((error: any) => console.log(`Add task error: ${error.message}`));

    setIsLoading(false);
  };

  return (
    <Container isScroll back title="Add new task">
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

        <DropdownPicker
          title="Members"
          selected={taskDetail.uids}
          items={usersSelect}
          onSelect={val => handleChangeValue('uids', val)}
          multible
        />

        <View>
          <RowComponent justify="flex-start">
            <RowComponent styles={{flex: 1}} justify="flex-start">
              <TitleComponent text="Attachments" flex={0} />
              <SpaceConponent width={8} />
              {/* <AttachSquare size={20} color={colors.white} /> */}
              <UploadFileComponent
                onUpload={file => setAttachments([...attachments, file])}
              />
            </RowComponent>
          </RowComponent>
          {attachments.length > 0 &&
            attachments.map((item, index) => (
              <RowComponent
                key={`attachments${index}`}
                justify="flex-start"
                styles={{
                  paddingVertical: 12,
                }}>
                <TextComponent text={item.name ?? ''} flex={0} />
              </RowComponent>
            ))}
        </View>
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          isLoading={isLoading}
          onPress={handleAddNewTask}
          text={'Save'}
        />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
