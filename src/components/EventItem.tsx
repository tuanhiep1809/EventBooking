import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import {EventModel} from '../model/EventModel';
import RowComponent from './RowComponent';
import {Location} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import {appInfos} from '../constants/appInfos';
import SpaceComponent from './SpaceComponent';
import AvatarGroup from './AvatarGroup';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  console.log('item', item);

  const navigation: any = useNavigation();
  return (
    <CardComponent
      styles={{
        width: appInfos.sizes.WIDTH * 0.7,
      }}
      isShadow
      onPress={() => {
        navigation.navigate('EventDetail', {item});
      }}>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
        source={require('../assets/images/event-image.png')}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent justify="space-between">
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <TextComponent
              color={appColors.danger2}
              font={fontFamilies.bold}
              size={18}
              text="10"
            />
            <TextComponent
              color={appColors.danger2}
              font={fontFamilies.semiBold}
              size={10}
              text="JUNE"
            />
          </CardComponent>
          <CardComponent styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <MaterialIcons
              name="bookmark"
              color={appColors.danger2}
              size={22}
            />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent numberOfLine={1} text={item.title} title size={18} />
      <AvatarGroup />
      <RowComponent justify="flex-start">
        <Location size={16} color={appColors.gray} />
        <SpaceComponent width={8} />
        <TextComponent numberOfLine={1} text={item.location.address} />
      </RowComponent>
    </CardComponent>
  );
};

export default EventItem;
