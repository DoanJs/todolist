import {doc, getDoc} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {db} from '../../firebaseConfig';
import {colors} from '../contants/colors';
import {fontFamilies} from '../contants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  uid: string;
  index?: number;
}

const AvatarComponent = (props: Props) => {
  const {uid, index} = props;
  const [userDetail, setUserDetail] = useState<any>();

  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };

  useEffect(() => {
    uid && handleGetUserById();
  }, [uid]);

  const handleGetUserById = async () => {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      setUserDetail({
        uid,
        ...docSnap.data(),
      });
    } else {
      console.log(`getDoc taskDetail error`);
    }
  };
  return userDetail ? (
    userDetail.imgUrl ? (
      <Image
        source={{uri: userDetail.imgUrl}}
        key={`image${uid}`}
        style={[imageStyle, {marginLeft: index > 0 ? -10 : 0}]}
      />
    ) : (
      <View
        key={`image${uid}`}
        style={[
          imageStyle,
          {
            marginLeft: index > 0 ? -10 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'coral',
            // backgroundColor: colors.gray2,
          },
        ]}>
        <Text
          style={[
            globalStyles.text,
            {fontFamily: fontFamilies.bold, fontSize: 14},
          ]}>
          {userDetail.displayName.substring(0, 1).toUpperCase() ?? ''}
        </Text>
      </View>
    )
  ) : (
    <></>
  );
};

export default AvatarComponent;
