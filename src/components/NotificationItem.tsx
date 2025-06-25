import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {More} from 'iconsax-react-native';
import moment from 'moment';
import React, {RefObject, useEffect, useState} from 'react';
import {ActivityIndicator, Linking, Text, View} from 'react-native';
import {IHandles} from 'react-native-modalize/lib/options';
import {db} from '../../firebaseConfig';
import {NotificationModel} from '../models/NotificationModel';
import {UserDetailModel} from '../models/UserDetailModel';
import AvatarComponent from './AvatarComponent';
import RowComponent from './RowComponent';
import SpaceConponent from './SpaceConponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import useModalNotiStore from '../zustand/store';

const NotificationItem = ({
  notification,
  modalizeRef,
}: {
  notification: NotificationModel;
  modalizeRef: RefObject<IHandles | null>;
}) => {
  const [sender, setSender] = useState<UserDetailModel>();
  const setData = useModalNotiStore(state => state.setDataModalNoti);

  useEffect(() => {
    notification && handleGetUserById();
  }, [notification]);

  const handleGetUserById = async () => {
    const docSnap = await getDoc(doc(db, 'users', notification.senderId));
    if (docSnap.exists()) {
      setSender(docSnap.data() as UserDetailModel);
    } else {
      console.log(`getDoc taskDetail error`);
    }
  };

  const handleNotification = async () => {
    Linking.openURL(`todolist://app/task-detail/${notification.objectId}`);
    if (!notification.isRead) {
      const docRef = doc(db, 'notifications', notification.id);

      await updateDoc(docRef, {isRead: true})
        .then(() => {
          console.log('Update notification success!');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return notification ? (
    <>
      <RowComponent
        justify="flex-start"
        styles={{marginVertical: 10}}
        onPress={handleNotification}>
        <AvatarComponent uid={notification.senderId} height={80} width={80} />
        <SpaceConponent width={12} />
        <View style={{flex: 1}}>
          <Text>
            <TitleComponent
              text={sender?.displayName ?? sender?.email ?? ''}
              flex={0}
            />{' '}
            <TextComponent text={notification.body} flex={0} line={2} />
          </Text>
          <TextComponent text={moment(notification?.createAt).fromNow()} />
        </View>
        <SpaceConponent width={8} />
        <View>
          <More
            size={20}
            color="#ffffff"
            onPress={() => {
              modalizeRef.current?.open();
              setData({...notification})
            }}
          />
          <View style={{flex: 1}}></View>
        </View>
      </RowComponent>
    </>
  ) : (
    <ActivityIndicator />
  );
};

export default NotificationItem;
