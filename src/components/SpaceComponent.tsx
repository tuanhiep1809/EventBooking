import React from 'react';
import {View} from 'react-native';
interface SpaceComponentProps {
  width?: number;
  height?: number;
}
const SpaceComponent = (prop: SpaceComponentProps) => {
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
