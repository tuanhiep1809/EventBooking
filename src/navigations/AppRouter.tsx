import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuthData, authSelector} from '../redux/reducers/authReducer';
import MainNavigation from './MainNavigation';
import AuthNavigator from './AuthNavigator';
import Splash from '../screens/Splash';

const AppRouter = () => {
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isSplash, setIsSplash] = useState(true);
  useEffect(() => {
    checkLogin();
    const timeOut = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const checkLogin = async () => {
    const data = await getItem();
    if (data) {
      dispatch(addAuthData(JSON.parse(data)));
    }
  };
  console.log('auth', auth);
  return (
    <>
      {isSplash ? (
        <Splash />
      ) : auth.accessToken ? (
        <MainNavigation />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppRouter;
