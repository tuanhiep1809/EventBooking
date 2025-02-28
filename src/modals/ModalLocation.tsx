import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {SearchNormal1} from 'iconsax-react-native';
import axios from 'axios';
import {LocationModel} from '../model/LocationModel';
import {appColors} from '../constants/appColors';
interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (
    val: string,
    //     {
    //     address: string;
    //     postion?: {
    //         lat: number;
    //         long: number;
    //     };
    // }
  ) => void;
}

const ModalLocation = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [keySearch, setKeySearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  useEffect(() => {
    if (keySearch === '') {
      setLocations([]);
    }
  }, [keySearch]);
  const handleSearchLocation = async () => {
    setIsLoading(true);
    try {
      const res = await axios(
        `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${keySearch}&limit=10&apiKey=9JLAiMxeXTHrd69a8Hi88WAn_3oDNoen3NFqOcMrMHg`,
      );
      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };
  console.log('locations', locations);
  return (
    <Modal
      animationType="slide"
      visible={visible}
      //    onRequestClose={onClose}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <RowComponent justify="flex-end">
          <View style={{flex: 1}}>
            <InputComponent
              placeholder="Search location"
              value={keySearch}
              affix={<SearchNormal1 size={20} color="#747688" />}
              onChange={setKeySearch}
              allowClear
              onEnd={handleSearchLocation}
            />
          </View>
          <SpaceComponent width={10} />

          <ButtonComponent type="link" text="Cancel" onPress={onClose} />
        </RowComponent>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={appColors.primary} />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <>
                  <TextComponent text={item.title} />
                </>
              )}
            />
          ) : (
            <TextComponent
              text={
                keySearch === ''
                  ? 'Please enter your location'
                  : 'No data found'
              }
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalLocation;
