import React from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {colors} from '../../contants/colors';
import SectionComponent from '../../components/SectionComponent';
import RowComponent from '../../components/RowComponent';
import {ArrowLeft2, Clock} from 'iconsax-react-native';
import TitleComponent from '../../components/TitleComponent';
import TextComponent from '../../components/TextComponent';
import SpaceConponent from '../../components/SpaceConponent';

const TaskDetailScreen = ({route, navigation}: any) => {
  const {color, taskDetail} = route.params;
  console.log(taskDetail);
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <StatusBar barStyle="light-content" />
      <SectionComponent
        // color={color ??  'rgba(113, 77, 217, 0.9'}
        styles={{
          backgroundColor: color ?? 'rgba(113, 77, 217, 0.9',
          paddingTop: 60,
          paddingBottom: 18,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}>
        <RowComponent styles={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size={28}
              color={color.white}
              style={{marginTop: -8, marginRight: 12}}
            />
          </TouchableOpacity>
          <TitleComponent text={taskDetail.title} size={22} />
        </RowComponent>

        <View style={{marginTop: 20}}>
          <TextComponent text="Due date" />
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent
              styles={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Clock size={20} color={colors.white} />
              <SpaceConponent width={4} />
              <TextComponent flex={0} text="houasds" />
            </RowComponent>
          </RowComponent>
        </View>
      </SectionComponent>
    </ScrollView>
  );
};

export default TaskDetailScreen;
