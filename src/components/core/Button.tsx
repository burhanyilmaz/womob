import { text } from '@theme/text';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
};

const Button = ({ title, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} className="px-6 py-4 bg-zinc-900 rounded-lg">
    <Text className={text({ type: 'subtitle', isCenter: true, class: 'text-white' })}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
