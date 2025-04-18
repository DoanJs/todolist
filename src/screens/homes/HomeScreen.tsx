import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {
  Add,
  Edit2,
  Element4,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {auth, db} from '../../../firebaseConfig';
import AvatarComponent from '../../components/AvatarComponent';
import CardComponent from '../../components/CardComponent';
import CardImageComponent from '../../components/CardImageComponent';
import CicularComponent from '../../components/CicularComponent';
import Container from '../../components/Container';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TagComponent from '../../components/TagComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {firebaseTimestampToDate} from '../../contants/firebaseTimestampToDate';
import {TaskModel} from '../../models/TaskModel';
import {globalStyles} from '../../styles/globalStyles';
import {HandleNotification} from '../../utils/handleNotification';

const HomeScreen = ({navigation}: any) => {
  const user = auth.currentUser;
  const [allTasks, setAllTasks] = useState<TaskModel[]>([]);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urgentTask, setUrgentTask] = useState<TaskModel[]>([]);
  const [taskCompleted, setTaskCompleted] = useState<TaskModel[]>([]);

  useEffect(() => {
    HandleNotification.checkNotificaionPermission();
  }, []);

  useEffect(() => {
    user && handlegetAllTasks();
  }, [user]);

  useEffect(() => {
    if (allTasks) {
      const taskUrgents = allTasks.filter((task: TaskModel) => task.isUrgent);
      setUrgentTask(taskUrgents);

      const arr = allTasks.filter((task: TaskModel) => task.progress === 1);
      setTaskCompleted(arr);
    }
  }, [allTasks]);

  const handlegetAllTasks = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, 'tasks'),
      where('uids', 'array-contains', user?.uid),
    );
    await onSnapshot(q, doc => {
      if (doc.empty) {
        setIsLoading(false);
        console.log(`Users data not found`);
      } else {
        const items: any = [];

        doc.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
            dueDate: firebaseTimestampToDate(item.data().dueDate),
            end: firebaseTimestampToDate(item.data().end),
            start: firebaseTimestampToDate(item.data().start),
          });
        });

        const arrSort = items
          .sort((a: any, b: any) => new Date(b.dueDate) - new Date(a.dueDate))
          .slice(0, 3);
        setAllTasks(items);
        setTasks(arrSort);
        setIsLoading(false);
      }
    });
  };

  const handleMoveToTaskDetail = (id: string, color?: string) =>
    navigation.navigate('TaskDetailScreen', {id, color});
  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent>
            <View style={{flex: 1}}>
              <TextComponent text={`Hi, ${user?.email}`} />
              <TitleComponent text="Be Productive today" />
            </View>

            <TouchableOpacity
              onPress={async () => {
                auth.signOut();
                await AsyncStorage.clear();
              }}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate('SearchScreen')}>
            <TextComponent color={colors.gray1} text="Search task..." />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent
                  text={`${taskCompleted.length}/${allTasks.length} tasks done`}
                />
                <SpaceConponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text={`${new Date().toLocaleString('en-US', {
                      month: 'short',
                    })} ${
                      new Date().getDate() < 10 ? '0' : ''
                    }${new Date().getDate()}`}
                    onPress={() => console.log('onpress')}
                  />
                </RowComponent>
              </View>
              <View>
                <CicularComponent
                  value={
                    Math.floor(taskCompleted.length * 100) / allTasks.length
                  }
                />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>

        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowComponent justify="flex-end">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ListTasks', {
                    tasks: JSON.stringify(allTasks),
                  })
                }>
                <TextComponent text="See all" flex={0} />
              </TouchableOpacity>
            </RowComponent>

            <RowComponent styles={{alignItems: 'flex-start'}}>
              <View style={{flex: 1}}>
                {tasks[0] && (
                  <TouchableOpacity
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[0].id as string,
                        'rgba(113, 77, 217, 0.9)',
                      )
                    }>
                    <CardImageComponent color="rgba(113, 77, 217, 0.9)">
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AddNewTask', {
                            editable: true,
                            task: {
                              ...tasks[0],
                              dueDate: new Date(tasks[0].dueDate).toISOString(),
                              start: new Date(tasks[0].start).toISOString(),
                              end: new Date(tasks[0].end).toISOString(),
                            },
                          })
                        }
                        style={[globalStyles.iconContainer]}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[0].title} line={2} />
                      <TextComponent text={tasks[0].description} line={3} />

                      <View style={{marginVertical: 24}}>
                        <RowComponent justify="flex-start">
                          {tasks[0].uids &&
                            tasks[0].uids.map((uid: string, index: number) => (
                              <AvatarComponent
                                uid={uid}
                                index={index}
                                key={`avatarComponent${index}`}
                              />
                            ))}
                        </RowComponent>
                        {tasks[0].progress && (
                          <ProgressBarComponent
                            size="large"
                            percent={`${Math.floor(tasks[0].progress * 100)}%`}
                            color={colors.blue1}
                          />
                        )}
                      </View>
                      <TextComponent
                        text={`Due, ${tasks[0].dueDate.getDate()} ${tasks[0].dueDate.toLocaleString(
                          'en-US',
                          {month: 'short'},
                        )} ${tasks[0].dueDate.getFullYear()}`}
                        size={12}
                        color={colors.desc}
                      />
                    </CardImageComponent>
                  </TouchableOpacity>
                )}
              </View>
              <SpaceConponent width={16} />
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <TouchableOpacity
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[1].id as string,
                        'rgba(33, 150, 243, 0.9)',
                      )
                    }>
                    <CardImageComponent color="rgba(33, 150, 243, 0.9)">
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AddNewTask', {
                            editable: true,
                            task: {
                              ...tasks[1],
                              dueDate: new Date(tasks[1].dueDate).toISOString(),
                              start: new Date(tasks[1].start).toISOString(),
                              end: new Date(tasks[1].end).toISOString(),
                            },
                          })
                        }
                        style={[globalStyles.iconContainer]}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[1].title} line={2} />
                      <RowComponent justify="flex-start">
                        {tasks[1].uids &&
                          tasks[1].uids.map((uid: string, index: number) => (
                            <AvatarComponent
                              uid={uid}
                              index={index}
                              key={`avatarComponent${index}`}
                            />
                          ))}
                      </RowComponent>
                      {tasks[1].progress && (
                        <ProgressBarComponent
                          percent={`${Math.floor(tasks[1].progress * 100)}%`}
                          color={colors.green}
                        />
                      )}
                    </CardImageComponent>
                  </TouchableOpacity>
                )}
                <SpaceConponent height={16} />
                {tasks[2] && (
                  <TouchableOpacity
                    onPress={() =>
                      handleMoveToTaskDetail(
                        tasks[2].id as string,
                        'rgba(18, 181, 22, 0.9)',
                      )
                    }>
                    <CardImageComponent color="rgba(18, 181, 22, 0.9)">
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AddNewTask', {
                            editable: true,
                            task: {
                              ...tasks[2],
                              dueDate: new Date(tasks[2].dueDate).toISOString(),
                              start: new Date(tasks[2].start).toISOString(),
                              end: new Date(tasks[2].end).toISOString(),
                            },
                          })
                        }
                        style={[globalStyles.iconContainer]}>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[2].title} line={2} />
                      <TextComponent text={tasks[2].description} line={3} />
                    </CardImageComponent>
                  </TouchableOpacity>
                )}
              </View>
            </RowComponent>
          </SectionComponent>
        ) : (
          <></>
        )}

        <SectionComponent>
          {urgentTask.length > 0 && <TitleComponent text="Urgents tasks" />}
          {urgentTask.length > 0 &&
            urgentTask.map((item: TaskModel, index: number) => (
              <CardComponent key={`urgentTask${index}`}>
                <RowComponent
                  onPress={() => handleMoveToTaskDetail(item.id as string)}>
                  <CicularComponent
                    value={item.progress ? item.progress * 100 : 0}
                    radius={36}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 12,
                    }}>
                    <TextComponent text={item.title} />
                  </View>
                </RowComponent>
              </CardComponent>
            ))}
        </SectionComponent>
      </Container>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddNewTask', {
              editable: false,
              task: undefined,
            })
          }
          activeOpacity={1}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              borderRadius: 100,
              width: '80%',
              padding: 16,
            },
          ]}>
          <TextComponent text="Add new task" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
