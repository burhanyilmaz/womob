import HomeSlider from '@components/HomeSlider';
import Post from '@containers/Post';
import { BlogStackNavigatorParamList } from '@navigators/BlogNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import postStore, { PostType } from '@store/PostStore';
import savedStore from '@store/SavedStore';
import searchStore from '@store/SearchStore';
import colors from '@theme/colors';
import { text } from '@theme/text';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
  RefreshControl,
} from 'react-native';

const BlogHomeScreen = () => {
  const { navigate } = useNavigation<NavigationProp<BlogStackNavigatorParamList>>();

  useEffect(
    () => () => {
      postStore.clearAll();
      savedStore.clearAll();
      searchStore.clearAll();
    },
    [],
  );

  const RenderItem: ListRenderItem<PostType> = ({ item: post }) => (
    <View className="px-5">
      <Post post={post} onPressPost={() => navigate('PostDetail', { post })} />
    </View>
  );

  const RenderListHeader = () => (
    <View>
      <HomeSlider
        posts={postStore.sliderPosts}
        onPressPost={post => navigate('PostDetail', { post })}
      />
      <Text className={text({ type: 'subtitle', class: 'text-left opacity-50 mx-4 mb-2' })}>
        All Posts
      </Text>
    </View>
  );

  return (
    <View className="bg-white flex-1">
      {postStore.loading && postStore.listingPosts.length > 0 && (
        <ActivityIndicator
          size="large"
          color={colors.zinc[600]}
          className="absolute z-50 right-0 left-0 bottom-4"
        />
      )}
      <FlatList
        windowSize={6}
        key="blogHome"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        renderItem={RenderItem}
        data={postStore.listingPosts}
        onEndReached={postStore.increasePage}
        ListHeaderComponent={RenderListHeader}
        ListEmptyComponent={<ActivityIndicator size="large" color={colors.zinc[600]} />}
        refreshControl={
          <RefreshControl
            refreshing={postStore.loading}
            onRefresh={async () => {
              await postStore.getPosts();
            }}
          />
        }
      />
    </View>
  );
};

export default observer(BlogHomeScreen);
