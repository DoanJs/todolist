import React, {useState} from 'react';
import {Button, Dimensions, Modal, Text, View} from 'react-native';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {colors} from '../contants/colors';
import {ArrowDown2} from 'iconsax-react-native';
import {globalStyles} from '../styles/globalStyles';
import SpaceConponent from './SpaceConponent';
import DatePicker from 'react-native-date-picker';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title?: string;
  placeholder?: string;
  selected?: Date;
  onSelect: (val: Date) => void;
}

const DateTimePickerComponent = (props: Props) => {
  const {type, title, placeholder, selected, onSelect} = props;
  const [isvisibleModalDateTime, setIsvisibleModalDateTime] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());

  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title} flex={0} />}
        <RowComponent
          onPress={() => setIsvisibleModalDateTime(true)}
          styles={[
            globalStyles.inputContainer,
            {marginTop: title ? 8 : 0, paddingVertical: 16},
          ]}>
          <TextComponent
            text={
              selected
                ? `${selected.getDate()}/${
                    selected.getMonth() + 1
                  }/${selected.getFullYear()}`
                : placeholder
                ? placeholder
                : ''
            }
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </RowComponent>
      </View>

      <Modal visible={isvisibleModalDateTime} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              width: '90%',
              backgroundColor: colors.white,
              padding: 20,
              borderRadius: 20,
            }}>
            <TitleComponent
              text="Date time picker"
              color={colors.gray}
              flex={0}
            />
            <View>
              <DatePicker
                mode={type}
                date={date}
                onDateChange={val => setDate(val)}
                locale="vi"
              />
            </View>
            <SpaceConponent height={20} />
            <Button
              title="Comfirm"
              onPress={() => {
                onSelect(date);
                setIsvisibleModalDateTime(false);
              }}
            />
            <Button
              title="Close"
              onPress={() => setIsvisibleModalDateTime(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponent;
