import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import SpaceConponent from './SpaceConponent';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
  isScroll?: boolean;
}

const Container = (props: Props) => {
  const {title, back, right, children, isScroll} = props;
  const navigation: any = useNavigation();
  return (
    <View style={[globalStyles.container, {flex: 1}]}>
      {/* Header container */}

      <RowComponent
        styles={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <SpaceConponent width={10}/>
        <View style={{flex: 1}}>
          {title && (
            <TextComponent
              flex={0}
              font={fontFamilies.bold}
              size={16}
              text={title}
              styles={{textAlign: 'center', marginLeft: back ? -24 : 0}}
            />
          )}
        </View>
      </RowComponent>
      {isScroll ? (
        <ScrollView style={{flex: 1, flexGrow: 1}}>{children}</ScrollView>
      ) : (
        <View style={{flex: 1}}>{children}</View>
      )}
    </View>
  );
};

export default Container;
