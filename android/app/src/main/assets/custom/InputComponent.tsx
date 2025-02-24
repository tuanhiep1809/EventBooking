import {View, Text, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {TextInput} from 'react-native';
import {EyeSlash} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Props {
  value: string;
  onChange: (text: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
}
const InputComponent = (props: Props) => {
  const {value, onChange, affix, placeholder, suffix, isPassword, allowClear} =
    props;
  return (
    <View>
      {affix ?? affix}

      <TextInput
        value={value}
        onChangeText={val => onChange(val)}
        placeholder={placeholder ?? ''}
        secureTextEntry={isPassword}
      />
      {suffix ?? suffix}
      <TouchableOpacity>
        {isPassword ? (
          <EyeSlash size={24} color="black" />
        ) : (
          value.length > 0 && <AntDesign name="close" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
