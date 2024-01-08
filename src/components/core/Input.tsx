import { TextInput } from 'react-native';

type Props = {
  value?: string;
  placeholder?: string;
  containerClass?: string;
  onPressClose?: () => void;
  onChangeText: (value: string) => void;
};

const Input = ({ value, containerClass, placeholder, onChangeText }: Props) => (
  <TextInput
    value={value}
    placeholder={placeholder}
    onChangeText={onChangeText}
    className={`border-[2px] rounded-lg h-[50px] border-zinc-700 text-zinc-600 px-4 pr-10 font-Medium bg-white ${containerClass}`}
  />
);

export default Input;
