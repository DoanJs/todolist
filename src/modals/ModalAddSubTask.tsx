import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../contants/colors';
import {globalStyles} from '../styles/globalStyles';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../firebaseConfig';

interface Props {
  visible: boolean;
  subTask?: any;
  onClose: () => void;
  taskId: string;
}
const initvalue = {
  title: '',
  description: '',
  isComplete: false,
};
const ModalAddSubTask = (props: Props) => {
  const {visible, subTask, onClose, taskId} = props;
  const [subTaskForm, setSubTaskForm] = useState(initvalue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeValue = (key: string, value: string | boolean) => {
    const data: any = {...subTaskForm};

    data[`${key}`] = value;

    setSubTaskForm(data);
  };

  const handleCloseModal = () => {
    setSubTaskForm(initvalue);
    onClose();
  };

  const handleSaveToDatabase = async () => {
    const data = {
      ...subTaskForm,
      createAt: Date.now(),
      updateAt: Date.now(),
      taskId,
    };

    setIsLoading(true);
    await addDoc(collection(db, 'subTasks'), data)
      .then(() => {
        // console.log(result.id)
        handleCloseModal();
      })
      .catch((error: any) =>
        console.log(`Add subTask error: ${error.message}`),
      ).finally;

    setIsLoading(false);
  };
  return (
    <Modal
      visible={visible}
      transparent
      style={globalStyles.modal}
      animationType="slide">
      <View style={[globalStyles.modalContainer]}>
        <View
          style={[globalStyles.modalContent, {backgroundColor: colors.gray}]}>
          <TitleComponent text="Add new Subtask" flex={0} />
          <View style={{paddingVertical: 16}}>
            <InputComponent
              title="Title"
              placeholder="Title"
              value={subTaskForm.title}
              color="#212121"
              onChange={val => handleChangeValue('title', val)}
              allowClear
            />
            <InputComponent
              title="Description"
              placeholder="Description"
              value={subTaskForm.description}
              onChange={val => handleChangeValue('description', val)}
              multible
              color="#212121"
              numberOfLine={3}
              allowClear
            />
          </View>
          <RowComponent>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={handleCloseModal}>
                <TextComponent text="Close" flex={0} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <ButtonComponent text="Save" onPress={handleSaveToDatabase} />
            </View>
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddSubTask;
