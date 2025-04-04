import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {fontFamilies} from '../contants/fontFamilies';
import TextComponent from './TextComponent';
import {colors} from '../contants/colors';
interface Props {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  color?: string;
}

const ButtonComponent = (props: Props) => {
  const {text, isLoading, onPress, color} = props;
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color ? color : isLoading ? colors.gray : colors.blue,
        padding: 14,
        borderRadius: 14,
      }}
      onPress={onPress}
      >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          styles={{textTransform: 'uppercase'}}
          size={16}
          font={fontFamilies.semibold}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
