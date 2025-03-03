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
import MapView from 'react-native-maps';
import {appInfos} from '../constants/appInfos';
import {AddressModel} from '../model/AddressModel';
import Geolocation from '@react-native-community/geolocation';
import GeoCoder from 'react-native-geocoding';
import {G} from 'react-native-svg';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    postion?: {
      lat: number;
      long: number;
    };
  }) => void;
}
GeoCoder.init('AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k');

const ModalLocation = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [keySearch, setKeySearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    if (keySearch === '') {
      setLocations([]);
    }
  }, [keySearch]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        if (info.coords) {
          setCurrentLocation({
            lat: info.coords.latitude,
            long: info.coords.longitude,
          });
        }
      },
      error => {
        console.log('error', error);
      },
    );
  }, []);
  useEffect(() => {
    if (addressSelected !== '') {
      GeoCoder.from(addressSelected).then(json => {
        var addressComponent = json.results[0].geometry.location;
        setCurrentLocation({
          lat: addressComponent.lat,
          long: addressComponent.lng,
        });
        // onSelect(addressSelected);
      });
    }
  }, [addressSelected]);
  const handleSearchLocation = async () => {
    setIsLoading(true);
    try {
      const res = await axios(
        `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${keySearch}&limit=5&apiKey=9JLAiMxeXTHrd69a8Hi88WAn_3oDNoen3NFqOcMrMHg`,
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
  // console.log('locations', locations);
  return (
    <Modal
      animationType="slide"
      visible={visible}
      //    onRequestClose={onClose}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <RowComponent justify="flex-end" styles={{paddingHorizontal: 20}}>
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
          <View
            style={{
              position: 'absolute',
              top: 85,
              right: 18,
              left: 18,
              backgroundColor: 'white',
              paddingHorizontal: 10,
              zIndex: 5,
            }}>
            {isLoading ? (
              <ActivityIndicator size="large" color={appColors.primary} />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{paddingBottom: 10}}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      setKeySearch('');
                    }}>
                    <TextComponent text={item.address.label} />
                  </TouchableOpacity>
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
          <SpaceComponent width={10} />

          <ButtonComponent type="link" text="Cancel" onPress={onClose} />
        </RowComponent>
        {currentLocation && (
          <MapView
            //  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              marginTop: 20,
              width: appInfos.sizes.WIDTH,
              height: appInfos.sizes.HEIGHT - 180,
              borderRadius: 20,
              marginBottom: 10,
              zIndex: -1,
            }}
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            region={{
              latitude: currentLocation.lat,
              longitude: currentLocation.long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            mapType="standard"
          />
        )}
        <ButtonComponent
          type="primary"
          text="Confirm"
          onPress={() => {
            onSelect({address: addressSelected, postion: currentLocation});
            onClose();
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalLocation;
