import {CloseSquare, TickSquare} from 'iconsax-react-native';
import React, {RefObject} from 'react';
import {View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import AvatarComponent from '../components/AvatarComponent';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import SpaceConponent from '../components/SpaceConponent';
import TextComponent from '../components/TextComponent';
import {colors} from '../contants/colors';
import useModalNotiStore from '../zustand/store';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import {IHandles} from 'react-native-modalize/lib/options';

const ModalDetailNotification = ({
  modalizeRef,
}: {
  modalizeRef: RefObject<IHandles | null>;
}) => {
  const dataModal: any = useModalNotiStore(state => state.data);

  const handleDeleteNotification = async (id: string) => {
    const docRef = doc(db, 'notifications', id);
    await deleteDoc(docRef)
      .then(() => {
        modalizeRef.current?.close();
      })
      .catch(error => console.log(error.message));
  };

  const handleUpdateNotification = async (id: string) => {
    const docRef = doc(db, 'notifications', id);
    await updateDoc(docRef, {isRead: !dataModal.isRead})
      .then(() => {
        modalizeRef.current?.close();
      })
      .catch(error => console.log(error.message));
  };
  return (
    <Modalize ref={modalizeRef} adjustToContentHeight={true}>
      <View style={{paddingHorizontal: 20}}>
        {dataModal && (
          <>
            <SectionComponent
              styles={{
                borderBottomWidth: 0.5,
                borderColor: colors.gray1,
                paddingVertical: 10,
              }}>
              <RowComponent justify="center" styles={{flexDirection: 'column'}}>
                <AvatarComponent
                  uid={dataModal.senderId}
                  height={80}
                  width={80}
                />
                <TextComponent text={dataModal.body} color={colors.bgColor} />
              </RowComponent>
            </SectionComponent>

            <SectionComponent>
              <RowComponent
                onPress={() => handleUpdateNotification(dataModal.id)}>
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'gray',
                    padding: 8,
                  }}>
                  {dataModal && dataModal.isRead ? (
                    <CloseSquare
                      size="22"
                      color={colors.bgColor}
                      variant="Bold"
                    />
                  ) : (
                    <TickSquare
                      size="22"
                      color={colors.bgColor}
                      variant="Bold"
                    />
                  )}
                </View>
                <SpaceConponent width={8} />
                <TextComponent
                  text={
                    dataModal && dataModal.isRead
                      ? 'Đánh dấu chưa đọc'
                      : 'Đánh dấu đã đọc'
                  }
                  color={colors.bgColor}
                  styles={{fontWeight: 'bold'}}
                />
              </RowComponent>
              <SpaceConponent height={16} />
              <RowComponent onPress={() => handleDeleteNotification(dataModal.id)}>
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: 'gray',
                    padding: 8,
                  }}>
                  <CloseSquare
                    size="22"
                    color={colors.bgColor}
                    variant="Bold"
                  />
                </View>
                <SpaceConponent width={8} />
                <TextComponent
                  text="Xóa thông báo này"
                  color={colors.bgColor}
                  styles={{fontWeight: 'bold'}}
                />
              </RowComponent>
            </SectionComponent>
          </>
        )}
      </View>
    </Modalize>
  );
};

export default ModalDetailNotification;
