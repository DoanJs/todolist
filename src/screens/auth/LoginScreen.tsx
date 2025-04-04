import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import SectionComponent from '../../components/SectionComponent';
import TitleComponent from '../../components/TitleComponent';
import {fontFamilies} from '../../contants/fontFamilies';
import {Text, View} from 'react-native';
import InputComponent from '../../components/InputComponent';
import {Lock, Sms} from 'iconsax-react-native';
import {colors} from '../../contants/colors';
import ButtonComponent from '../../components/ButtonComponent';
import SpaceConponent from '../../components/SpaceConponent';
import {globalStyles} from '../../styles/globalStyles';
// import auth from '@react-native-firebase/auth';
import TextComponent from '../../components/TextComponent';
import {auth} from '../../../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('vidu1@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleLoginWithEmail = async () => {
    console.log(email, password);
    if (!email || !password) {
      setErrorText('Please enter your email or password!');
    } else {
      setErrorText('');
      setIsLoading(true);

      // await auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(userCredential => {
      //     setIsLoading(false);
      //     const user = userCredential.user;

      //     console.log(user);
      //   })
      //   .catch((error: any) => {
      //     setIsLoading(false);
      //     setErrorText(error.message);
      //   });

      await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Signed in
          setIsLoading(false);
          const user = userCredential.user;

          console.log(user);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setErrorText(error.message);
        });
    }
  };

  return (
    <Container>
      <SectionComponent styles={{justifyContent: 'center', flex: 1}}>
        <TitleComponent
          text="Login"
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
            <TextComponent
              text={errorText}
              flex={0}
              color="coral"
              styles={{fontStyle: 'italic'}}
            />
          )}
        </View>

        <ButtonComponent
          text="login"
          onPress={handleLoginWithEmail}
          isLoading={isLoading}
        />

        <SpaceConponent height={20} />

        <Text style={[globalStyles.text, {textAlign: 'center'}]}>
          You don't have an account?{' '}
          <Text
            style={{color: 'coral'}}
            onPress={() => navigation.navigate('SigninScreen')}>
            Create an acount
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
