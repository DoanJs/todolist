import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../contants/colors';
import { fontFamilies } from '../contants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number
}

const CicularComponent = (props: Props) => {
  const {color, value, maxValue, radius} = props;
  return (
    <CircularProgress
      value={value}
      title={`${Math.floor(value)}%`}
      radius={radius ?? 46}
      showProgressValue={false}
      activeStrokeColor={color ?? colors.blue}
      inActiveStrokeColor={colors.gray2}
      inActiveStrokeWidth={14}
      titleColor={colors.text}
      activeStrokeWidth={14}
      titleFontSize={20}
      titleStyle={{
        fontFamily: fontFamilies.semibold
      }}
    />
  );
};

export default CicularComponent;
