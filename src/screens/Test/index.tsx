import Button from '@components/core/Button';
import { text } from '@theme/text';
import { SafeAreaView, Text, View } from 'react-native';

const TestScreen = () => (
  <SafeAreaView>
    <View className="px-4">
      <Text className={text({ type: 'title1', class: 'my-2' })}>Test Screen</Text>
      <Button title="Press me!" />
    </View>
  </SafeAreaView>
);

export default TestScreen;
