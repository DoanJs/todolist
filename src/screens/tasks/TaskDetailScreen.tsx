import React from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  ViewBase,
} from 'react-native';
import {colors} from '../../contants/colors';
import SectionComponent from '../../components/SectionComponent';
import RowComponent from '../../components/RowComponent';
import {
  ArrowLeft2,
  Calendar2,
  Clock,
  DocumentUpload,
} from 'iconsax-react-native';
import TitleComponent from '../../components/TitleComponent';
import TextComponent from '../../components/TextComponent';
import SpaceConponent from '../../components/SpaceConponent';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import {TaskModel} from '../../models/TaskModel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../../styles/globalStyles';

const TaskDetailScreen = ({route, navigation}: any) => {
  const {color, taskDetail}: {color: string; taskDetail: TaskModel} =
    route.params;
  console.log(taskDetail);
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <StatusBar barStyle="light-content" />

      <SectionComponent
        styles={{
          backgroundColor: color ?? 'rgba(113, 77, 217, 0.9',
          padding: 20,
          paddingTop: 60,
          paddingBottom: 18,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <RowComponent styles={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size={28}
              color={colors.white}
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
              <TextComponent flex={0} text="8 AM - 1PM" />
            </RowComponent>
            <RowComponent
              styles={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Calendar2 size={20} color={colors.white} />
              <SpaceConponent width={4} />
              <TextComponent flex={0} text="21 Dec 2023" />
            </RowComponent>
            <RowComponent
              styles={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <AvatarGroup uids={['10']} />
            </RowComponent>
          </RowComponent>
        </View>
      </SectionComponent>
      <View style={{paddingHorizontal: 20}}>
        <SectionComponent>
          <TitleComponent text="Description" />
          <CardComponent
            bgColor={colors.bgColor}
            styles={{
              borderWidth: 1,
              borderColor: colors.gray,
              borderRadius: 20,
            }}>
            <TextComponent text={taskDetail.description} />
          </CardComponent>
        </SectionComponent>

        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <TextComponent text="File & links" flex={0} />
              <RowComponent styles={{flex: 1}}>
                <MaterialCommunityIcons
                  name="file-excel"
                  size={38}
                  color="#00733B"
                  style={globalStyles.documentImg}
                />
                <Ionicons
                  name="document-text"
                  size={38}
                  color="#0263D1"
                  style={globalStyles.documentImg}
                />
                <AntDesign
                  name="pdffile1"
                  size={34}
                  color="#e5252a"
                  style={globalStyles.documentImg}
                />
                <DocumentUpload
                  size={38}
                  color={colors.white}
                  style={globalStyles.documentImg}
                />
              </RowComponent>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </View>
    </ScrollView>
  );
};

export default TaskDetailScreen;
