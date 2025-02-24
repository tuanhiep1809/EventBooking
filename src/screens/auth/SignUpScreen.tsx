import {View, Text, Image, Switch} from 'react-native';
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
import {Lock, Sms, User} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import SocialLogin from './components/SocialLogin';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuthData} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState(initValue);
  const [loadding, setLoadding] = useState(false);
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};

    data[`${key}`] = value;

    setValues(data);
  };
  const handelSignUp = async () => {
    setLoadding(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/verification',
        {
          email: values.email,
        },
        'post',
      );
      console.log('handelSignUp', res);
      navigation.navigate('Verification', {
        email: values.email,
        password: values.password,
        username: values.username,
        code: res.data.code,
      });
      setLoadding(false);
    } catch (error) {
      console.log('error', error);
      setLoadding(false);
    }
  };
  return (
    <>
      <ContainerComponent back isScroll isImageBackground>
        <SectionComponent>
          <TextComponent size={24} font={fontFamilies.medium} text="Sign Up" />
          {/* <SpaceComponent height={15} /> */}
          <InputComponent
            value={values.username}
            placeholder="Full name"
            onChange={val => handleChangeValue('username', val)}
            allowClear
            affix={<User size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.email}
            placeholder="abc@email.com"
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            // onEnd={() => formValidator('email')}
          />
          <InputComponent
            value={values.password}
            placeholder="Password"
            onChange={val => handleChangeValue('password', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            // onEnd={() => formValidator('password')}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
            // onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            onPress={handelSignUp}
            text="SIGN UP"
            type="primary"
          />
        </SectionComponent>
        <SocialLogin />

        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Already have an account? " />
            <ButtonComponent
              type="link"
              text="Sign up"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </RowComponent>
        </SectionComponent>
      </ContainerComponent>
      <LoadingModal visible={loadding} />
    </>
  );
};

export default SignUpScreen;
