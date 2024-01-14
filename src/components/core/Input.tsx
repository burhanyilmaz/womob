import { ReactNode } from 'react';
import { TextInput, View } from 'react-native';

type Props = {
  value?: string;
  placeholder?: string;
  rightIcon?: ReactNode;
  containerClass?: string;
  onChangeText: (value: string) => void;
};

const Input = ({ value, containerClass, placeholder, onChangeText, rightIcon }: Props) => (
  <View className="">
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      className={`border-[2px] rounded-lg h-[50px] border-zinc-700 text-zinc-600 px-4 pr-10 font-Medium bg-white ${containerClass}`}
    />
    {rightIcon ? (
      <View className="justify-center items-center absolute right-4  h-full z-50">{rightIcon}</View>
    ) : null}
  </View>
);

export default Input;
