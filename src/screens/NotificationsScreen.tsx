import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {auth, db} from '../../firebaseConfig';
import NotificationItem from '../components/NotificationItem';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../contants/colors';
import ModalDetailNotification from '../modals/ModalDetailNotification';
import {NotificationModel} from '../models/NotificationModel';
import { Modalize } from 'react-native-modalize';

const NotificationsScreen = ({navigation}: any) => {
  const user = auth.currentUser;
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    const getQuerySnap = async () => {
      const q = query(
        collection(db, 'notifications'),
        where('recevicerIds', 'array-contains', user?.uid),
      );
      await onSnapshot(q, doc => {
        if (doc.empty) {
          setNotifications([]);
        } else {
          const items: any = [];
          doc.forEach(res => {
            items.push({
              id: res.id,
              ...res.data(),
            });
          });
          setNotifications(items);
        }
      });
    };

    getQuerySnap();
  }, [user]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <SectionComponent
        styles={{
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
          <TitleComponent text={'Notifications'} size={22} line={1} />
        </RowComponent>
      </SectionComponent>

      {notifications.length > 0 &&
        notifications
          .sort((a, b) => b.createAt - a.createAt)
          .map((notification: NotificationModel) => (
            <View
              key={notification.id}
              style={{
                paddingHorizontal: 20,
                backgroundColor: notification.isRead
                  ? colors.bgColor
                  : colors.gray1,
              }}>
              <NotificationItem
                notification={notification}
                modalizeRef={modalizeRef}
              />
            </View>
          ))}

      <ModalDetailNotification modalizeRef={modalizeRef} />
    </ScrollView>
  );
};

export default NotificationsScreen;
