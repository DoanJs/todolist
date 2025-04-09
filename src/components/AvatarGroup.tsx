import React from 'react';
import {Image, View} from 'react-native';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  uids: string[];
}

const AvatarGroup = (props: Props) => {
  const {uids} = props;
  const uidsLenght = 10;
  const imageUrl =
    'https://www.thiennhien.net/wp-content/uploads/2013/01/280113_CS_voi.jpg';
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };
  return (
    <RowComponent justify="flex-start">
      {Array.from({length: uidsLenght}).map(
        (item, index) =>
          index < 3 && (
            <Image
              source={{uri: imageUrl}}
              key={index}
              style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
            />
          ),
      )}
      {uidsLenght > 5 && (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: 'coral',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}>
          <TextComponent
            flex={0}
            font={fontFamilies.semibold}
            styles={{lineHeight: 19}}
            text={`+${uidsLenght - 3 > 9 ? 9 : uidsLenght - 3}`}
          />
        </View>
      )}
    </RowComponent>
  );
};

export default AvatarGroup;
