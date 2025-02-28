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
GoogleSignin.configure({
  webClientId:
    '1037279516270-35d48235f75l9tgvkqgj9lgepvg1mj4i.apps.googleusercontent.com',
});

const SocialLogin = () => {
  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
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
