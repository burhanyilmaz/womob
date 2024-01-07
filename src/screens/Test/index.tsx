import Button from '@components/core/Button';
import { text } from '@theme/text';
import { Text, View } from 'react-native';

const TestScreen = () => (
  <View>
    <Text className={text({ type: 'title1', class: 'my-2' })}>Test Screen</Text>
    <Button title="Press me!" />
  </View>
);

export default TestScreen;
