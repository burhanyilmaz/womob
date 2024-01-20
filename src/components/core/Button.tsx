import { button } from '@theme/button';
import colors from '@theme/colors';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
  variant?: 'solid' | 'outline' | 'secondary';
};

const ActivityIndicatorColors = {
  solid: colors.zinc[200],
  outline: colors.zinc[900],
  secondary: colors.zinc[900],
};

const Button = ({ title, onPress, isLoading, variant = 'solid' }: Props) => (
  <TouchableOpacity onPress={onPress} className={button({ variant })}>
    {isLoading ? (
      <ActivityIndicator color={ActivityIndicatorColors[variant]} />
    ) : (
      <Text className={button({ title: variant })}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default Button;
