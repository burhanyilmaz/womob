import Post from '@containers/Post';
import { BlogStackNavigatorParamList } from '@navigators/BlogNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PostType } from '@store/PostStore';
import savedStore from '@store/SavedStore';
import { text } from '@theme/text';
import { BookMarked } from 'lucide-react-native';
import { observer } from 'mobx-react-lite';
import { FlatList, ListRenderItem, SafeAreaView, Text, View } from 'react-native';

const SavedScreen = () => {
  const { navigate } = useNavigation<NavigationProp<BlogStackNavigatorParamList>>();

  const ListEmpty = () => (
    <View className="items-center mt-4">
      <BookMarked className="text-zinc-500 mb-2" size={28} />
      <Text className={text({ type: 'subtitle', class: 'text-zinc-600' })}>
        There is no saved posts.
      </Text>
    </View>
  );

  const RenderItem: ListRenderItem<PostType> = ({ item: post }) => (
    <Post post={post} onPressPost={() => navigate('PostDetail', { post })} />
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        windowSize={6}
        className="px-5 pt-4"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        renderItem={RenderItem}
        ListEmptyComponent={ListEmpty}
        data={savedStore.listResult || []}
      />
    </SafeAreaView>
  );
};

export default observer(SavedScreen);
