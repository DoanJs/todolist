import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  line?: number;
}

const TextComponent = (props: Props) => {
  const {text, size, font, color, flex, styles, line} = props;
  return (
    <Text
      numberOfLines={line}
      style={[
        globalStyles.text,
        {
          flex: flex ?? 1,
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          color: color ?? colors.desc,
          textAlign:'justify'
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
