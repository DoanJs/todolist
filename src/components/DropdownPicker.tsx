import {ArrowDown2, SearchNormal1, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../contants/colors';
import {SelectModel} from '../models/SelectModel';
import {globalStyles} from '../styles/globalStyles';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import RowComponent from './RowComponent';
import SpaceConponent from './SpaceConponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';

interface Props {
  title?: string;
  items: SelectModel[];
  selected?: string[];
  onSelect: (val: string[]) => void;
  multible?: boolean;
}

const DropdownPicker = (props: Props) => {
  const {title, items, selected, onSelect, multible} = props;

  const [isvisible, setIsvisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<SelectModel[]>([]);
  const [dataSelected, setDataSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const data = items.filter(element =>
        element.label
          .toLocaleLowerCase()
          .includes(searchKey.toLocaleLowerCase()),
      );
      setResults(data);
    }
  }, [searchKey]);

  const handleRemoveItemSelected = (index: number) => {
    if (selected) {
      selected?.splice(index, 1);
      onSelect(selected);
    }
  };

  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find(element => element.value === id);
    return (
      item && (
        <RowComponent
          onPress={() => handleRemoveItemSelected(index)}
          key={id}
          styles={{
            marginRight: 4,
            padding: 4,
            borderRadius: 100,
            borderWidth: 0.5,
            borderColor: colors.gray2,
            marginBottom: 8,
          }}>
          <TextComponent text={item.label} flex={0} />
          <SpaceConponent width={8} />
          <AntDesign size={14} name="close" color={colors.text} />
        </RowComponent>
      )
    );
  };

  const handleConfirmSelect = () => {
    onSelect(dataSelected);
    setIsvisible(false);
  };

  const handleSelectItem = (id: string) => {
    if (multible) {
      const data = [...dataSelected];

      const index = data.findIndex(item => item === id);
      if (index === -1) {
        data.push(id);
      } else {
        data.splice(index, 1);
      }

      setDataSelected(data);
    } else {
      setDataSelected([id]);
    }
  };

  return (
    <View style={{marginBottom: 16}}>
      {title && <TitleComponent text={title} flex={0} />}
      <RowComponent
        onPress={() => setIsvisible(true)}
        styles={[
          globalStyles.inputContainer,
          {marginTop: title ? 8 : 0, paddingVertical: 16},
        ]}>
        <View style={{flex: 1, paddingRight: 12}}>
          {selected && selected?.length > 0 ? (
            <RowComponent
              justify="flex-start"
              styles={{
                flexWrap: 'wrap',
              }}>
              {selected.map((id, index) => renderSelectedItem(id, index))}
            </RowComponent>
          ) : (
            <TextComponent text="Select" color={colors.gray2} flex={0} />
          )}
        </View>
        <ArrowDown2 color={colors.text} size={20} />
      </RowComponent>

      <Modal
        visible={isvisible}
        style={{flex: 1}}
        animationType="slide"
        statusBarTranslucent>
        <View
          style={[
            globalStyles.container,
            {padding: 20, paddingTop: 60, paddingBottom: 60},
          ]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <RowComponent
                styles={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flex: 1, marginRight: 12}}>
                  <InputComponent
                    styles={{marginBottom: 0}}
                    value={searchKey}
                    onChange={val => setSearchKey(val)}
                    placeholder="Search ..."
                    prefix={<SearchNormal1 size={20} color={colors.gray2} />}
                    allowClear
                  />
                </View>
                <TouchableOpacity onPress={() => setIsvisible(false)}>
                  <TextComponent text="Cancel" color="coral" flex={0} />
                </TouchableOpacity>
              </RowComponent>
            }
            style={{flex: 1}}
            data={searchKey ? results : items}
            renderItem={({item}) => (
              <RowComponent
                onPress={() => handleSelectItem(item.value)}
                key={item.value}
                styles={{paddingVertical: 16}}>
                <TextComponent
                  size={16}
                  text={item.label}
                  color={
                    dataSelected.includes(item.value) ? 'coral' : colors.text
                  }
                />
                {dataSelected.includes(item.value) && (
                  <TickCircle size={20} color="coral" />
                )}
              </RowComponent>
            )}
          />
          <ButtonComponent text="Confirm" onPress={handleConfirmSelect} />
        </View>
      </Modal>
    </View>
  );
};

export default DropdownPicker;
