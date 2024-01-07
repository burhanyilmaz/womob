import { useFonts } from 'expo-font';

export const useLoadFonts = () => {
  const [loaded] = useFonts({
    Bold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../../assets/fonts/Poppins-Medium.ttf'),
    Regular: require('../../assets/fonts/Poppins-Regular.ttf'),
    SemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  return { loaded };
};
