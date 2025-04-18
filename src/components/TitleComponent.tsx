import React from 'react';
import {fontFamilies} from '../contants/fontFamilies';
import TextComponent from './TextComponent';
import {StyleProp, TextStyle} from 'react-native';

interface Props {
  text: string;
  font?: string;
  size?: number;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  line?: number;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color, flex, styles, line} = props;
  return (
    <TextComponent
      line={line}
      size={size ?? 20}
      font={font ?? fontFamilies.bold}
      color={color}
      text={text}
      flex={flex ?? 1}
      styles={[styles]}
    />
  );
};

export default TitleComponent;
