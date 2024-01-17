import HtmlToNativeViewer from '@components/HtmlToNativeViewer';
import PostDetailHeader from '@components/PostDetail/PostDetailHeader';
import { BlogStackNavigatorParamList } from '@navigators/BlogNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import savedStore from '@store/SavedStore';
import { text } from '@theme/text';
import { width } from '@utils/helpers';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = width * 0.6;
const CONTENT_MARGIN_TOP = HEADER_HEIGHT * 0.9;

const PostDetailScreen = () => {
  const {
    params: { post },
  } = useRoute<RouteProp<BlogStackNavigatorParamList, 'PostDetail'>>();
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const scrollableContentMarginTop = CONTENT_MARGIN_TOP + top;

  const animatedStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(
      scrollY.value,
      [0, 200],
      [scrollableContentMarginTop, top + 48],
      Extrapolation.CLAMP,
    ),
  }));

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const onPressSave = () => post && savedStore.addPost(post);

  return (
    <View className="bg-zinc-50 flex-1">
      <PostDetailHeader
        topMargin={top}
        onPressBack={goBack}
        onPressSave={onPressSave}
        headerImage={post?.headerImage}
        isSavedPost={savedStore.isSavedPost(post.id)}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        className="rounded-md bg-zinc-50"
        style={[{ marginTop: scrollableContentMarginTop }, animatedStyle]}>
        <View renderToHardwareTextureAndroid className="px-5 pb-8">
          <Text className={text({ type: 'subhead', class: 'text-zinc-500 mt-4 mb-1' })}>
            {post?.category}
          </Text>
          <Text numberOfLines={3} className={text({ type: 'title4', class: 'text-zinc-900 mb-2' })}>
            {post?.title}
          </Text>
          <HtmlToNativeViewer html={post?.content} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default observer(PostDetailScreen);
