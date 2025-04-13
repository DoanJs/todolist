import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import {globalStyles} from '../styles/globalStyles';
import ButtonComponent from '../components/ButtonComponent';
import {colors} from '../contants/colors';
import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';

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

  const handleChangeValue = (key: string, value: string | boolean) => {
    const data: any = {...subTask};

    data[`${key}`] = value;

    setSubTaskForm(data);
  };

  const handleCloseModal = () => {
    setSubTaskForm(initvalue);
    onClose();
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
              onChange={val => handleChangeValue('title', val)}
              />
            <InputComponent
              title="Description"
              placeholder="Description"
              value={subTaskForm.description}
              onChange={val => handleChangeValue('description', val)}
              multible
              numberOfLine={3}
            />
          </View>
          <RowComponent>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={handleCloseModal}>
                <TextComponent text="Close" flex={0} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <ButtonComponent text="Save" onPress={() => {}} />
            </View>
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddSubTask;
