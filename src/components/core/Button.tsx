import { text } from '@theme/text';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress?: () => object;
};

const Button = ({ title, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} className="px-6 py-2.5 bg-teal-600 rounded-md">
    <Text className={text({ type: 'headline', isCenter: true, class: 'text-white' })}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
