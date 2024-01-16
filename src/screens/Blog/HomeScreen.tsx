import Post from '@containers/Post';
import { BlogStackNavigatorParamList } from '@navigators/BlogNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import postStore, { PostType } from '@store/PostStore';
import colors from '@theme/colors';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, View } from 'react-native';

const BlogHomeScreen = () => {
  const { navigate } = useNavigation<NavigationProp<BlogStackNavigatorParamList>>();
  const posts = Array.from(postStore.posts.values());

  useEffect(
    () => () => {
      postStore.clearAll();
    },
    [],
  );

  const RenderItem: ListRenderItem<PostType> = ({ item: post }) => (
    <Post post={post} onPressPost={() => navigate('PostDetail', { post })} />
  );

  return (
    <View className="bg-white  flex-1">
      {postStore.loading && posts.length > 0 && (
        <ActivityIndicator
          size="large"
          color={colors.zinc[600]}
          className="absolute z-50 right-0 left-0 bottom-4"
        />
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
        ListEmptyComponent={<ActivityIndicator size="large" color={colors.zinc[600]} />}
      />
    </View>
  );
};

export default observer(BlogHomeScreen);
