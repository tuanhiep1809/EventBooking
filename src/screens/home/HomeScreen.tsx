/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
import Geolocation from '@react-native-community/geolocation';
import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {
  CategoriesList,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import CircleComponent from '../../components/CircleComponent';
import TagComponent from '../../components/TagComponent';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import axios from 'axios';
import {AddressModel} from '../../model/AddressModel';

const HomeScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();

  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    imageUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };

  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        if (info.coords) {
          reverseGeoCode(info.coords.latitude, info.coords.longitude);
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }, []);
  const reverseGeoCode = async (lat: number, long: number) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apikey=9JLAiMxeXTHrd69a8Hi88WAn_3oDNoen3NFqOcMrMHg`;
    try {
      const res = await axios(api);
      if (res && res.status === 200) {
        const item = res.data.items;
        setCurrentLocation(item[0]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log('currentLocation', currentLocation);

  return (
    <View style={[globalStyles.container]}>
      <StatusBar
        barStyle={'light-content'}
        // backgroundColor={appColors.primary}
      />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 159,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? 20 : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
          {/* button drawer , location, notify */}
          <RowComponent>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{flex: 1, alignItems: 'center'}]}>
              <RowComponent>
                <TextComponent
                  text="Current Location"
                  color={appColors.white2}
                  size={12}
                />
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowComponent>
              {currentLocation && (
                <TextComponent
                  text={`${currentLocation.address.city}, ${currentLocation.address.county}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamilies.medium}
                  size={13}
                />
              )}
            </View>

            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={24} />
          <RowComponent>
            <RowComponent
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                variant="TwoTone"
                size={22}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: '#A29EF0',
                }}
              />
              <TextComponent text="Search..." color={`#A29EF0`} flex={1} />
            </RowComponent>
            <TagComponent
              bgColor={'#5D56F3'}
              onPress={() =>
                navigation.navigate('SearchEvents', {isFilter: true})
              }
              label="Filters"
              icon={
                <CircleComponent size={20} color="#B1AEFA">
                  <Sort size={16} color="#5D56F3" />
                </CircleComponent>
              }
            />
          </RowComponent>
          <SpaceComponent height={15} />
        </View>
        <View style={{}}>
          <CategoriesList isFill />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          // backgroundColor: 'red',
          marginTop: 16,
        }}>
        <TabBarComponent onPress={() => {}} title="Upcoming Events" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <EventItem key={index} type="card" item={itemEvent} />
          )}
        />
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{flex: 1, padding: 16, minHeight: 127}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <TextComponent text="Invite your friends" title />
            <TextComponent text="Get $20 for ticket" />

            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {
                    marginTop: 12,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  font={fontFamilies.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <TabBarComponent onPress={() => {}} title="Nearby You" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array.from({length: 5})}
          renderItem={({item, index}) => (
            <EventItem key={index} type="card" item={itemEvent} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
