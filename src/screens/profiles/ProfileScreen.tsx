import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuthData, removeAuthData} from '../../redux/reducers/authReducer';
import {ButtonComponent} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const ProfileScreen = () => {
  const auth = useSelector(addAuthData);
  const dispatch = useDispatch();
  return (
    <View>
      <ButtonComponent
        onPress={async () => {
          await AsyncStorage.clear();
          await GoogleSignin.signOut();
          dispatch(removeAuthData({}));
        }}
        text="Add Auth Data"
      />
    </View>
  );
};

export default ProfileScreen;
