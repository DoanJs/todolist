import React from 'react';
import {fontFamilies} from '../contants/fontFamilies';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  font?: string;
  size?: number;
  color?: string;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color} = props;
  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.bold}
      color={color}
      text={text}
    />
  );
};

export default TitleComponent;
