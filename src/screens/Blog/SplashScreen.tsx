import Logo from '@components/Logo';
import { MainNavigatorParamList } from '@navigators/MainNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';

const BlogSplashScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MainNavigatorParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigate('Blog');
    }, 10);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-zinc-50">
      <Logo parts={['Your ', 'Logo']} />
    </View>
  );
};

export default BlogSplashScreen;
