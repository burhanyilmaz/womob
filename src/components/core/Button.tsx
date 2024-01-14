import { text } from '@theme/text';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
};

const Button = ({ title, onPress, isLoading }: Props) => (
  <TouchableOpacity onPress={onPress} className="px-6 py-4 bg-zinc-900 rounded-lg">
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <Text className={text({ type: 'subtitle', isCenter: true, class: 'text-white' })}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

export default Button;
