/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {appInfos} from '../constants/appInfos';
import {SpaceComponent} from '../components';

const Splash = () => {
  return (
    <ImageBackground
      source={require('../assets/images/backgroup-img.png')}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      imageStyle={{flex: 1}}>
      {/* Add your code here */}
      <Image
        source={require('../assets/images/logo.png')}
        style={{
          width: appInfos.sizes.WIDTH * 0.7,
          resizeMode: 'contain',
        }}
      />
      <SpaceComponent height={10} />
      <ActivityIndicator size="large" color="#ADD8E6" />
    </ImageBackground>
  );
};

export default Splash;
