import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress?: () => object;
};

const Button = ({ title, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} className="px-6 py-2.5 bg-slate-500 rounded-md">
    <Text className="text-white text-base">{title}</Text>
  </TouchableOpacity>
);

export default Button;
