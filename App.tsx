import TestScreen from '@screens/Test';
import { text } from '@theme/text';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className={text({ type: 'body' })}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <TestScreen />
    </View>
  );
}
