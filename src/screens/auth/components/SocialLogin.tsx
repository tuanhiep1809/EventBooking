import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColors} from '../../../constants/appColors';
import {Facebook, Google} from '../../../assets/svgs';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import authenticationAPI from '../../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuthData} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '1037279516270-p2tme7997sgoahlbjuog25dbvgvhdcja.apps.googleusercontent.com',
});

const SocialLogin = () => {
  const dispatch = useDispatch();
  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.data?.user;
      const res = await authenticationAPI.HandleAuthentication(
        '/google-signin',
        user,
        'post',
      );
      dispatch(addAuthData(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
      console.log('res', res.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SectionComponent>
      <TextComponent
        styles={{
          textAlign: 'center',
        }}
        text="OR"
        size={16}
        font={fontFamilies.medium}
        color={appColors.gray4}
      />
      <ButtonComponent
        text="Logout"
        onPress={async () => {
          await GoogleSignin.signOut();
        }}
      />
      <ButtonComponent
        type="primary"
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />

      <ButtonComponent
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        // onPress={handleLoginWithFacebook}
        iconFlex="left"
        icon={<Facebook />}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
