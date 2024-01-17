import Logo from '@components/Logo';
import { MainNavigatorParamList } from '@navigators/MainNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import categoryStore from '@store/CategoryStore';
import { useEffect } from 'react';
import { View } from 'react-native';

const BlogSplashScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MainNavigatorParamList>>();

  useEffect(() => {
    categoryStore.getCategories();

    setTimeout(() => {
      navigate('Blog');
    }, 1000);
  }, []);

  return (
    <View className="items-center justify-center flex-1 bg-zinc-50">
      <Logo parts={['Your ', 'Logo']} />
    </View>
  );
};

export default BlogSplashScreen;
