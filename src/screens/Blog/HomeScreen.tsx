import Post from '@containers/Post';
import postStore, { PostType } from '@store/PostStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, View } from 'react-native';

const BlogHomeScreen = () => {
  const posts = Array.from(postStore.posts.values());

  useEffect(
    () => () => {
      postStore.clearAll();
    },
    [],
  );

  const RenderItem: ListRenderItem<PostType> = ({ item }) => <Post post={item} />;

  return (
    <View className="bg-white  flex-1">
      {postStore.loading && posts.length > 0 && (
        <ActivityIndicator size="large" className="absolute z-50 right-0 left-0 bottom-4" />
      )}
      <FlatList
        data={posts}
        windowSize={6}
        className="px-5 pt-4"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        renderItem={RenderItem}
        onEndReached={postStore.increasePage}
        ListEmptyComponent={<ActivityIndicator />}
      />
    </View>
  );
};

export default observer(BlogHomeScreen);
