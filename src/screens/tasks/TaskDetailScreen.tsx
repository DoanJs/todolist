import {
  AddSquare,
  ArrowLeft2,
  Calendar2,
  Clock,
  TickCircle,
} from 'iconsax-react-native';
import React from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {fontFamilies} from '../../contants/fontFamilies';
import {TaskModel} from '../../models/TaskModel';
import {globalStyles} from '../../styles/globalStyles';

const TaskDetailScreen = ({route, navigation}: any) => {
  const {color, taskDetail}: {color: string; taskDetail: TaskModel} =
    route.params;

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
              <TextComponent
                flex={0}
                text={`${new Date(taskDetail.start).toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                })} - ${new Date(taskDetail.end).toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                })}`}
              />
            </RowComponent>
            <RowComponent
              styles={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Calendar2 size={20} color={colors.white} />
              <SpaceConponent width={4} />
              <TextComponent
                flex={0}
                text={`${taskDetail.dueDate.getDate()} ${taskDetail.dueDate.toLocaleString(
                  'en-US',
                  {month: 'short'},
                )} ${taskDetail.dueDate.getFullYear()}`}
              />
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
                <AntDesign
                  name="addfile"
                  size={34}
                  color={colors.white}
                  style={globalStyles.documentImg}
                />
              </RowComponent>
            </RowComponent>
          </CardComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: colors.success,
                marginRight: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.success,
                  width: 14,
                  height: 14,
                  borderRadius: 100,
                }}
              />
            </View>
            <TextComponent
              text="Progress"
              flex={1}
              font={fontFamilies.medium}
              size={18}
            />
          </RowComponent>
          <SpaceConponent height={12} />
          <RowComponent>
            <View style={{flex: 1}}>
              <TextComponent text="Slide" />
            </View>
            <TextComponent
              text="70%"
              size={18}
              flex={0}
              font={fontFamilies.bold}
            />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent>
            <TitleComponent text="Sub tasks" size={20} flex={1} />
            <TouchableOpacity>
              <AddSquare size={24} variant="Bold" color={colors.success} />
            </TouchableOpacity>
          </RowComponent>
          <SpaceConponent height={12} />
          {Array.from({length: 3}).map((item, index) => (
            <CardComponent key={`subtask${index}`} styles={{marginBottom: 12}}>
              <RowComponent>
                <TickCircle color={colors.success} variant="Bold" size={22} />
                <SpaceConponent width={8} />
                <TextComponent text="asdsd" />
              </RowComponent>
            </CardComponent>
          ))}
        </SectionComponent>
      </View>
    </ScrollView>
  );
};

export default TaskDetailScreen;
