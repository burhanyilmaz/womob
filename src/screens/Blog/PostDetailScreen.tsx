import HtmlToNativeViewer from '@components/HtmlToNativeViewer';
import PostDetailHeader from '@components/PostDetail/PostDetailHeader';
import { BlogStackNavigatorParamList } from '@navigators/BlogNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import savedStore from '@store/SavedStore';
import { text } from '@theme/text';
import { width } from '@utils/helpers';
import { observer } from 'mobx-react-lite';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = width * 0.6;
const CONTENT_MARGIN_TOP = HEADER_HEIGHT * 0.5;

const PostDetailScreen = () => {
  const {
    params: { post },
  } = useRoute<RouteProp<BlogStackNavigatorParamList, 'PostDetail'>>();
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const onPressSave = () => post && savedStore.addPost(post);

  return (
    <SafeAreaView className="bg-zinc-50 flex-1">
      <PostDetailHeader
        topMargin={top}
        onPressBack={goBack}
        onPressSave={onPressSave}
        headerImage={post?.headerImage}
        isSavedPost={savedStore.isSavedPost(post.id)}
      />
      <ScrollView className="rounded-md bg-zinc-50" style={{ marginTop: CONTENT_MARGIN_TOP + top }}>
        <View className="px-5 pb-8">
          <Text className={text({ type: 'subhead', class: 'text-zinc-500 mt-4 mb-1' })}>
            {post?.category}
          </Text>
          <Text numberOfLines={3} className={text({ type: 'title4', class: 'text-zinc-900 mb-2' })}>
            {post?.title}
          </Text>
          <HtmlToNativeViewer html={post?.content} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(PostDetailScreen);
