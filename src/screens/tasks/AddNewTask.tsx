import {DocumentPickerResponse, pick} from '@react-native-documents/picker';
import Cloudinary, {upload, UploadApiOptions} from 'cloudinary-react-native';
import {addDoc, collection, getDocs} from 'firebase/firestore';
import {AttachSquare} from 'iconsax-react-native';
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
import {colors} from '../../contants/colors';
import {SelectModel} from '../../models/SelectModel';
import {TaskModel} from '../../models/TaskModel';

import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {CLOUDINARY_URL, UPLOAD_PRESET} from '../../../cloudinary.config';

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
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);
  const [attachmentsUrl, setAttachmentsUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handlegetAllUsers();
  }, []);

  const handleUploadFileToClodinary = async (file: DocumentPickerResponse) => {
    // setUploading(true);
    const items = [...taskDetail.fileUrls];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      items.push(res.data.secure_url);
      handleChangeValue('fileUrls', items);
      console.log(items);
    } catch (err: any) {
      console.error('Upload attachments failed:', err.message);
    } finally {
      // setUploading(false);
    }
  };

  const handlePickerDocument = async () => {
    try {
      const result = await pick({
        mode: 'open',
      });
      setAttachments(result);
    } catch (error: any) {
      console.log(`handlePickerDocument error: ${error.message}`);
    }
  };

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

  const handleChangeValue = (id: string, value: string | string[] | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    setIsLoading(true);
    if (attachments.length > 0) {
      attachments.map((item: DocumentPickerResponse) =>
        handleUploadFileToClodinary(item),
      );
    }

    await addDoc(collection(db, 'taks'), taskDetail)
      .then(() => {
        console.log('New task added!!!');
        navigation.goBack();
      })
      .catch((error: any) => console.log(`Add task error: ${error.message}`));

    setIsLoading(false);
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

        <DropdownPicker
          title="Members"
          selected={taskDetail.uids}
          items={usersSelect}
          onSelect={val => handleChangeValue('uids', val)}
          multible
        />

        <View>
          <RowComponent justify="flex-start" onPress={handlePickerDocument}>
            <TitleComponent text="Attachments" flex={0} />
            <SpaceConponent width={8} />
            <AttachSquare size={20} color={colors.white} />
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
        <ButtonComponent onPress={handleAddNewTask} text={'Save'} />
      </SectionComponent>
      
    </Container>
  );
};

export default AddNewTask;
