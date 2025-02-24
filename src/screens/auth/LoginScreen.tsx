import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import SocialLogin from './components/SocialLogin';
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuthData} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const handelLogin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        {
          email,
          password,
        },
        'post',
      );
      dispatch(addAuthData(res.data));
      await AsyncStorage.setItem(
        'auth',
        isRemember ? JSON.stringify(res.data) : res.data.email,
      );
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <ContainerComponent isImageBackground>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/logo-text.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 20,
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent size={24} font={fontFamilies.medium} text="Sign In" />
        {/* <SpaceComponent height={15} /> */}
        <InputComponent
          affix={<Sms size={22} color={appColors.gray} />}
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          type="number-pad"
          allowClear
        />
        <InputComponent
          affix={<Lock size={22} color={appColors.gray} />}
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          allowClear
          isPassword
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{false: appColors.gray, true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={val => setIsRemember(!isRemember)}
            />
            <TextComponent size={14} text="Remember me" />
          </RowComponent>
          <ButtonComponent
            onPress={() => navigation.navigate('ForgotPassword')}
            text={'Forgot Password?'}
            type="link"
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent onPress={handelLogin} text="SIGN IN" type="primary" />
      </SectionComponent>
      <SocialLogin />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don’t have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
