import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../contants/colors';
interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}
const CardComponent = (props: Props) => {
  const {children, bgColor, styles, onPress} = props;
  return onPress ? (
    <TouchableOpacity onPress={onPress}
      style={[
        globalStyles.inputContainer,
        {padding: 12, backgroundColor: bgColor ?? colors.gray},
        styles,
      ]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        globalStyles.inputContainer,
        {padding: 12, backgroundColor: bgColor ?? colors.gray},
        styles,
      ]}>
      {children}
    </View>
  );
};

export default CardComponent;
