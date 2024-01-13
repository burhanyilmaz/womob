import { Text, View } from 'react-native';

type Props = {
  parts: [string, string];
};
const Logo = ({ parts }: Props) => (
  <View className="flex-row">
    <Text className="text-zinc-700 text-[28px] font-Bold">{parts[0]}</Text>
    <View className="bg-zinc-900 rounded-md">
      <Text className="text-white text-[28px] font-Bold mx-2">{parts[1]}</Text>
    </View>
  </View>
);

export default Logo;
