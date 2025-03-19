import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../contants/colors';
import { fontFamilies } from '../contants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
}

const CicularComponent = (props: Props) => {
  const {color, value, maxValue} = props;
  return (
    <CircularProgress
      value={value}
      showProgressValue={false}
      activeStrokeColor={color ?? colors.blue}
      inActiveStrokeColor={colors.gray2}
      title={`${value}%`}
      titleColor={colors.text}
      titleFontSize={32}
      titleStyle={{
        fontFamily: fontFamilies.semibold
      }}
    />
  );
};

export default CicularComponent;
