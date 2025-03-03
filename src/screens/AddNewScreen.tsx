import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {fontFamilies} from '../constants/fontFamilies';
import userAPI from '../apis/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownPicker from '../components/DropdownPicker';
import {SelectModel} from '../model/SelectModel';
import eventAPI from '../apis/eventApi';
import GeoCoder from 'react-native-geocoding';
// import {API_MAPS_KEY} from '@env';
const initValues = {
  title: '',
  description: '',
  locationTitle: '',
  locationAddress: '',
  position: {
    lat: '',
    long: '',
  },
  photoUrl: '',
  users: [],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
  categories: '',
};
const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const [userSelects, setUserSelects] = useState<SelectModel[]>([]);
  const [categories, setCategories] = useState<SelectModel[]>([]);
  const handleChangeValue = (key: string, value: any) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);
  const handleGetAllUser = async () => {
    try {
      const res = await userAPI.HandleUser('/get-all');
      if (res && res.data) {
        const items: SelectModel[] = [];
        res.data.forEach((element: any) => {
          items.push({
            label: element.email,
            value: element.id,
          });
        });
        setUserSelects(items);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleLocation = (val: any) => {
    const items = {...eventData};
    items.position = val.postion;
    items.locationAddress = val.address;

    setEventData(items);
  };
  const handelAddEvent = async () => {
    let data = {
      ...eventData,
      photoUrl:
        'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474074JKg/anh-gai-xinh-che-mat-buon_040403377.jpg',
    };
    try {
      const res = await eventAPI.HandleEvent('/add-event', data, 'post');
      if (res && res.data) {
        console.log('res.data', res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent
          text="Add new event"
          font={fontFamilies.medium}
          size={16}
        />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          allowClear
          value={eventData.title}
          placeholder="Title"
          onChange={(value: string) => handleChangeValue('title', value)}
        />
        <InputComponent
          allowClear
          multiline
          value={eventData.description}
          placeholder="Description"
          numberOfLines={4}
          onChange={(value: string) => handleChangeValue('description', value)}
        />
        <DropdownPicker
          selected={eventData.categories}
          values={[
            {label: 'Music', value: 'Music'},
            {label: 'Sport', value: 'Sport'},
            {label: 'Food', value: 'Food'},
            {label: 'Art', value: 'Art'},
          ]}
          onSelect={val => handleChangeValue('categories', val)}
        />
        <RowComponent>
          <DateTimePicker
            label="Start at: "
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
            selected={eventData.startAt}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            label="End at:"
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
            selected={eventData.endAt}
          />
        </RowComponent>
        <DateTimePicker
          label="Date:"
          type="date"
          onSelect={val => handleChangeValue('date', val)}
          selected={eventData.date}
        />
        <DropdownPicker
          label="Invited Users"
          onSelect={(val: string | string[]) =>
            handleChangeValue('users', val as string[])
          }
          multible
          selected={eventData.users}
          values={userSelects}
        />
        <InputComponent
          placeholder="Price"
          allowClear
          type="number-pad"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
        />
        <InputComponent
          placeholder="Title Address"
          allowClear
          value={eventData.locationTitle}
          onChange={val => handleChangeValue('locationTitle', val)}
        />
      </SectionComponent>
      <SectionComponent>
        <ChoiceLocation
          onSelect={val => {
            handleLocation(val);
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Add New"
          type="primary"
          onPress={handelAddEvent}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
