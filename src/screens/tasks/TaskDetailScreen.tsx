import {Slider} from '@miblanchard/react-native-slider';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {
  AddSquare,
  ArrowLeft2,
  Calendar2,
  Clock,
  TickCircle,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../../../firebaseConfig';
import AvatarGroup from '../../components/AvatarGroup';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {firebaseTimestampToDate} from '../../contants/firebaseTimestampToDate';
import {fontFamilies} from '../../contants/fontFamilies';
import {TaskModel} from '../../models/TaskModel';
import {globalStyles} from '../../styles/globalStyles';

const TaskDetailScreen = ({route, navigation}: any) => {
  const {color, id}: {color: string; id: string} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    id && getTaskDetail(id);
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setFileUrls(taskDetail.fileUrls);
      setProgress(taskDetail.progress as number);
    }
  }, [taskDetail]);

  useEffect(() => {
    if (taskDetail && taskDetail.progress !== progress) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [progress, fileUrls, subTasks]);

  const getTaskDetail = async (id: string) => {
    const docSnap = await getDoc(doc(db, 'tasks', id));
    if (docSnap.exists()) {
      setTaskDetail({
        ...docSnap.data(),
        dueDate: firebaseTimestampToDate(docSnap.data().dueDate),
        end: firebaseTimestampToDate(docSnap.data().end),
        start: firebaseTimestampToDate(docSnap.data().start),
      } as TaskModel);
    } else {
      console.log(`getDoc taskDetail error`);
    }
  };

  const handleUpdateTask = async () => {
    const data = {...taskDetail, progress, fileUrls, subTasks, updateAt: Date.now()};
    const docRef = doc(db, 'tasks', id);

    setIsLoading(true);
    await updateDoc(docRef, data)
      .then(() => {
        Alert.alert('Updated completed!!!');
        setIsLoading(false);
        setIsChanged(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return taskDetail ? (
    <>
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
                <Slider
                  onValueChange={val => setProgress(val[0])}
                  value={progress}
                  maximumTrackTintColor={colors.gray2}
                  minimumTrackTintColor={colors.success}
                  thumbTintColor={colors.success}
                  thumbStyle={{
                    borderWidth: 2,
                    borderColor: colors.white,
                  }}
                  trackStyle={{borderRadius: 10, height: 10}}
                />
              </View>
              <SpaceConponent width={4} />
              <TextComponent
                text={`${progress ? Math.floor(progress * 100) : '0'}%`}
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
              <CardComponent
                key={`subtask${index}`}
                styles={{marginBottom: 12}}>
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
      {isChanged && (
        <View style={{position: 'absolute', right: 20, left: 20, bottom: 20}}>
          <ButtonComponent
            isLoading={isLoading}
            text="Update"
            onPress={handleUpdateTask}
          />
        </View>
      )}
    </>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={50} />
    </View>
  );
};

export default TaskDetailScreen;
