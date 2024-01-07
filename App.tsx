import MainNavigator from '@navigators/MainNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <MainNavigator />
    </>
  );
}
