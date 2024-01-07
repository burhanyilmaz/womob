import { useLoadFonts } from '@hooks/useLoadFonts';
import MainNavigator from '@navigators/MainNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const { loaded } = useLoadFonts();

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <MainNavigator />
    </>
  );
}
