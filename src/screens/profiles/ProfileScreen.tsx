import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuthData, removeAuthData} from '../../redux/reducers/authReducer';
import {ButtonComponent} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const auth = useSelector(addAuthData);
  const dispatch = useDispatch();
  return (
    <View>
      <ButtonComponent
        onPress={async () => {
          dispatch(removeAuthData({}));
          await AsyncStorage.clear();
        }}
        text="Add Auth Data"
      />
    </View>
  );
};

export default ProfileScreen;
