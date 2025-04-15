import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import Container from '../../components/Container';
import InputComponent from '../../components/InputComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {fontFamilies} from '../../contants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
// import auth from '@react-native-firebase/auth';
import {createUserWithEmailAndPassword, User, UserCredential} from 'firebase/auth';
import {auth} from '../../../firebaseConfig';
import {HandleUser} from '../../utils/handleUser';

const SigninScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('vidu1@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleSigninWithEmail = async () => {
    if (!email || !password) {
      setErrorText('Please enter your email or password!');
    } else {
      setErrorText('');
      setIsLoading(true);

      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed up
          const user: User = userCredential.user;
          // save user to firestore
          HandleUser.SaveToDatabase(user);

          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          setErrorText(error.message);
        });
    }
  };

  return (
    <Container>
      <SectionComponent styles={{justifyContent: 'center', flex: 1}}>
        <TitleComponent
          text="Sign In"
          size={32}
          font={fontFamilies.bold}
          styles={{textTransform: 'uppercase', flex: 0, textAlign: 'center'}}
        />

        <View style={{marginVertical: 20}}>
          <InputComponent
            value={email}
            onChange={val => setEmail(val)}
            prefix={<Sms size={20} color={colors.desc} />}
            placeholder="Email"
            title="Email"
            allowClear
          />
          <InputComponent
            value={password}
            onChange={val => setPassword(val)}
            prefix={<Lock size={20} color={colors.desc} />}
            placeholder="Password"
            title="Password"
            isPassword
          />
          {errorText && (
            <TextComponent text={errorText} flex={0} color="coral" />
          )}
        </View>

        <ButtonComponent
          text="sign in"
          onPress={handleSigninWithEmail}
          isLoading={isLoading}
        />

        <SpaceConponent height={20} />

        <Text style={[globalStyles.text, {textAlign: 'center'}]}>
          You have an already account?{' '}
          <Text
            style={{color: 'coral'}}
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default SigninScreen;
