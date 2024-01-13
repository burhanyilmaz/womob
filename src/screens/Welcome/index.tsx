import { welcomeScreenBg } from '@components/Images';
import Logo from '@components/Logo';
import Button from '@components/core/Button';
import Input from '@components/core/Input';
import { MainNavigatorParamList } from '@navigators/MainNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import postStore from '@store/PostStore';
import { text } from '@theme/text';
import { observer } from 'mobx-react-lite';
import { ImageBackground, Text, View } from 'react-native';

const WelcomeScreen = () => {
  const { navigate } = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const onConvertWpIntoMobile = () => {
    postStore.getPosts();
    navigate('BlogSplash');
  };

  return (
    <ImageBackground
      source={welcomeScreenBg}
      className="flex-1 items-center justify-center px-5 bg-white">
      <View className="mb-10 items-center">
        <Logo parts={['Wo', 'Mob']} />
        <Text className={text({ type: 'subtitle', class: 'opacity-60 text-zinc-900 mt-1' })}>
          WordPress to Mobile App
        </Text>
      </View>
      <View className="w-full">
        <Input
          value={postStore.url}
          containerClass="w-full mb-4"
          onChangeText={postStore.setUrl}
          placeholder="Type your wordpress site link"
        />
        <Button title="Convert Wordpress into Mobile" onPress={onConvertWpIntoMobile} />
      </View>
    </ImageBackground>
  );
};

export default observer(WelcomeScreen);
