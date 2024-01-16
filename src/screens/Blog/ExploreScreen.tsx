import Input from '@components/core/Input';
import Post from '@containers/Post';
import useDebounce from '@hooks/useDebounce';
import { BlogStackNavigatorParamList } from '@navigators/BlogNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PostType } from '@store/PostStore';
import searchStore from '@store/SearchStore';
import colors from '@theme/colors';
import { text } from '@theme/text';
import { BookText, Search } from 'lucide-react-native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

const ExploreScreen = () => {
  const value = useDebounce(searchStore.term, 300);
  const { navigate } = useNavigation<NavigationProp<BlogStackNavigatorParamList>>();

  useEffect(() => {
    if (value.length > 2) {
      searchStore.searchPost();
    }
  }, [value]);

  const ListEmpty = () => {
    if (!searchStore.loading && searchStore.term) {
      return (
        <View className="items-center mt-4">
          <BookText className="text-zinc-500 mb-2" size={28} />
          <Text className={text({ type: 'subtitle', class: 'text-zinc-600' })}>
            There is no posts.
          </Text>
        </View>
      );
    }

    return null;
  };

  const RenderItem: ListRenderItem<PostType> = ({ item: post }) => (
    <Post post={post} onPressPost={() => navigate('PostDetail', { post })} />
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-4 mb-4">
        <Input
          placeholder="Search..."
          onChangeText={searchStore.setTerm}
          rightIcon={
            searchStore.loading ? (
              <ActivityIndicator className="" color={colors.zinc[800]} />
            ) : (
              <Search className="text-zinc-600" />
            )
          }
        />
      </View>

      <FlatList
        windowSize={6}
        className="px-5 pt-4"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        renderItem={RenderItem}
        ListEmptyComponent={ListEmpty}
        data={searchStore.listResult || []}
      />
    </SafeAreaView>
  );
};

export default observer(ExploreScreen);
