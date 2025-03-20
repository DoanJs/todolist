import React, {ReactNode} from 'react';
import {ImageBackground, View} from 'react-native';
import cardBg from '../assets/card-bg.jpg';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
}

const CardImageComponent = (props: Props) => {
  const {children, color} = props;
  return (
    <ImageBackground
      source={cardBg}
      style={[globalStyles.card]}
      imageStyle={{borderRadius: 12}}>
      <View
        style={[
          {
            backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
            borderRadius: 12,
            flex: 1,
            padding: 12,
          },
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default CardImageComponent;
