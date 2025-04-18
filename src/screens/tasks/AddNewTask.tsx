import {getAuth} from 'firebase/auth';
import {addDoc, collection, doc, getDocs, setDoc} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
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
import UploadFileComponent from '../../components/UploadFileComponent';
import {SelectModel} from '../../models/SelectModel';
import {Attachment, TaskModel} from '../../models/TaskModel';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  attachments: [],
  createAt: new Date(),
  updateAt: new Date(),
  isUrgent: false
};

const AddNewTask = ({navigation, route}: any) => {
  const {editable, task}: {editable: boolean; task: TaskModel} = route.params;

  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = getAuth().currentUser;

  useEffect(() => {
    handlegetAllUsers();
  }, []);

  useEffect(() => {
    if (user) {
      setTaskDetail({...taskDetail, uids: [user.uid]});
    }
  }, [user]);

  useEffect(() => {
    task &&
      setTaskDetail({
        ...task,
        dueDate: new Date(task.dueDate),
        start: new Date(task.start),
        end: new Date(task.end),
      });
  }, [task]);

  const handlegetAllUsers = async () => {
    await getDocs(collection(db, 'users'))
      .then(snap => {
        if (snap.empty) {
          console.log(`Users data not found`);
        } else {
          const items: SelectModel[] = [];

          snap.forEach(item => {
            items.push({
              label: item.data().displayName,
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
    if (user) {
      setIsLoading(true);
      const data = {
        ...taskDetail,
        attachments,
        createAt: task ? task.createAt : Date.now(),
        updateAt: Date.now(),
      };

      if (task) {
        const docRef = doc(db, 'tasks', `${task.id}`);
        await setDoc(docRef, data)
          .then(() => {
            console.log('update task complete!!!');
            navigation.goBack();
          })
          .catch(error => {
            setIsLoading(false);
            console.log(error);
          });
      } else {
        await addDoc(collection(db, 'tasks'), data)
          .then(() => {
            console.log('New task added!!!');
            navigation.goBack();
          })
          .catch((error: any) =>
            console.log(`Add task error: ${error.message}`),
          );
      }

      setIsLoading(false);
    } else {
      Alert.alert('You not login!!!');
    }
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
          text={task ? 'Update' : 'Save'}
        />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
