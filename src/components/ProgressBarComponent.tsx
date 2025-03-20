import React from 'react';
import {DimensionValue, View} from 'react-native';
import {colors} from '../contants/colors';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { fontFamilies } from '../contants/fontFamilies';

interface Props {
  size?: 'small' | 'default' | 'large';
  color?: string;
  percent: DimensionValue;
}

const ProgressBarComponent = (props: Props) => {
  const {size, color, percent} = props;
  const heightContent = size === 'small' ? 6 : size === 'large' ? 10 : 8;
  return (
    <View>
      <View
        style={{
          height: heightContent,
          width: '100%',
          backgroundColor: 'rgba(0,0,0, 0.3)',
          marginTop: 12,
          borderRadius: 100,
        }}>
        <View
          style={{
            backgroundColor: color ?? colors.blue,
            width: percent,
            height: '100%',
            borderRadius: 100,
          }}
        />
      </View>

      <RowComponent justify="space-between" styles={{marginTop: 4}}>
        <TextComponent text="Progress" size={12} />
        <TextComponent text={`${percent}`} size={12} flex={0} font={fontFamilies.bold} />
      </RowComponent>
    </View>
  );
};

export default ProgressBarComponent;
