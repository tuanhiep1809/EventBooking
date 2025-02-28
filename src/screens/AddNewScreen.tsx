import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  InputComponent,
  SectionComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
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
  const handleChangeValue = (key: string, value: any) => {
    const items = {...eventData};
    items[`${key}`] = value;
    setEventData(items);
  };
  const handelAddEvent = async () => {
    console.log('eventData', eventData);
  };
  return (
    <ContainerComponent isScroll>
      <Text>Add new event</Text>
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
      </SectionComponent>
      <SectionComponent>
        <ChoiceLocation onSelect={() => {}} />
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
