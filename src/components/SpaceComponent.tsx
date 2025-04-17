import React from 'react';
import {View} from 'react-native';
interface Props {
  width?: number;
  height?: number;
}
const SpaceComponent = (prop: Props) => {
  const {width, height} = prop;
  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default SpaceComponent;
