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
import {db} from '../../../firebaseConfig';
import AvatarGroup from '../../components/AvatarGroup';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import UploadFileComponent from '../../components/UploadFileComponent';
import {colors} from '../../contants/colors';
import {firebaseTimestampToDate} from '../../contants/firebaseTimestampToDate';
import {fontFamilies} from '../../contants/fontFamilies';
import {Attachment, TaskModel} from '../../models/TaskModel';
import { bytesToMB } from '../../utils/bytesToMB';

const TaskDetailScreen = ({route, navigation}: any) => {
  const {color, id}: {color: string; id: string} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(attachments);

  useEffect(() => {
    id && getTaskDetail(id);
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setProgress(taskDetail.progress as number);
      setAttachments(taskDetail.attachments);
    }
  }, [taskDetail]);

  useEffect(() => {
    if (
      (taskDetail && taskDetail.progress !== progress) ||
      attachments.length !== taskDetail?.attachments.length
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [progress, subTasks, attachments]);

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
    const data = {
      ...taskDetail,
      progress,
      attachments,
      subTasks,
      updateAt: Date.now(),
    };
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
            <RowComponent>
              <TitleComponent text="Files & links" flex={1} />
              <UploadFileComponent
                onUpload={file => {
                  setAttachments([...attachments, file]);
                }}
              />
            </RowComponent>

            {attachments.map((attachment: Attachment, index: number) => (
              <View key={`attachment${index}`}>
                <TextComponent flex={0} text={attachment.name} />
                <TextComponent flex={0} text={`${bytesToMB(attachment.size)} MB`} size={12}/>
              </View>
            ))}
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