import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {TextInput} from 'react-native';
import {EyeSlash} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../constants/appColors';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  value: string;
  onChange: (text: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  multiline?: boolean;
  numberOfLines?: number;
  onEnd?: () => void;
}
const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    allowClear,
    type,
    numberOfLines,
    multiline,
    onEnd,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);
  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}

      <TextInput
        style={[
          styles.Input,
          globalStyles.text,
          {
            paddingHorizontal: affix || suffix ? 14 : 0,
          },
        ]}
        numberOfLines={numberOfLines}
        multiline={multiline}
        value={value}
        onEndEditing={onEnd}
        onChangeText={val => onChange(val)}
        placeholder={placeholder ?? ''}
        secureTextEntry={isShowPassword}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPassword ? 'eye-slash' : 'eye'}
            size={22}
            color="black"
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="closecircleo" size={22} color="black" />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBlock: 19,
  },
  Input: {
    padding: 0,
    margin: 0,
    flex: 1,
    // paddingHorizontal: 14,
  },
});
