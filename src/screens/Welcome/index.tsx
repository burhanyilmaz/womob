import ExampleWpSites from '@components/ExampleWpSites';
import { welcomeScreenBg } from '@components/Images';
import Logo from '@components/Logo';
import Button from '@components/core/Button';
import Input from '@components/core/Input';
import { MainNavigatorParamList } from '@navigators/MainNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { api } from '@services/Api';
import postStore from '@store/PostStore';
import { text } from '@theme/text';
import { checkUrlIsValid, convertUrl } from '@utils/helpers';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Alert, ImageBackground, Text, View } from 'react-native';

const WelcomeScreen = () => {
  const [exampleWpSitesModalVisible, setExampleWpSitesModalVisible] = useState(false);
  const { navigate } = useNavigation<NavigationProp<MainNavigatorParamList>>();

  const onConvertWpIntoMobile = () => {
    const url = convertUrl(postStore.url);

    if (!checkUrlIsValid(url)) {
      Alert.alert(`"${postStore.url}" is not valid website url.`);

      return;
    }

    postStore.setUrl(url);
    api.createApiInstance(url);

    postStore.getPosts().then(post => {
      if (!post?.length) {
        Alert.alert('Warning', 'Your website may not wordpress.');

        return;
      }
      navigate('BlogSplash');
    });
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
          containerClass="w-full"
          onChangeText={postStore.setUrl}
          placeholder="Type your wordpress site link"
        />
        <View className="h-4" />
        <Button
          isLoading={postStore.loading}
          onPress={onConvertWpIntoMobile}
          title="Convert Wordpress into Mobile"
        />
        <View className="h-4" />
        <Button
          variant="outline"
          title="Show Example Websites"
          onPress={() => setExampleWpSitesModalVisible(true)}
        />
      </View>
      <ExampleWpSites
        visible={exampleWpSitesModalVisible}
        onPressExampleWebsite={url => {
          postStore.setUrl(url);
          setExampleWpSitesModalVisible(false);
          onConvertWpIntoMobile();
        }}
        onClose={() => setExampleWpSitesModalVisible(false)}
      />
    </ImageBackground>
  );
};

export default observer(WelcomeScreen);
