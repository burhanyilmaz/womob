import colors from '@theme/colors';
import { getHitSlop, width } from '@utils/helpers';
import { ArrowLeft, Bookmark, Share } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';

type Props = {
  topMargin: number;
  isSavedPost: boolean;
  headerImage?: string;
  onPressSave: () => void;
  onPressBack: () => void;
  onPressShare: () => void;
};

const PostDetailHeader = ({
  topMargin,
  headerImage,
  onPressSave,
  onPressBack,
  isSavedPost,
  onPressShare,
}: Props) => (
  <View className="w-full absolute overflow-hidden">
    <View
      style={{ marginTop: topMargin + 16 }}
      className="absolute z-40 px-5 flex-row justify-between items-center content-between w-full">
      <Pressable onPress={onPressBack} hitSlop={getHitSlop({ value: 40 })}>
        <ArrowLeft className="text-zinc-50" />
      </Pressable>
      <View className="flex-row items-center justify-center">
        <Pressable
          onPress={onPressSave}
          hitSlop={getHitSlop({ value: 20, right: 10 })}
          className="mr-5">
          <Bookmark className="text-zinc-50" fill={isSavedPost ? colors.zinc[50] : 'transparent'} />
        </Pressable>
        <Pressable onPress={onPressShare} hitSlop={getHitSlop({ value: 20, left: 10 })}>
          <Share className="text-zinc-50" />
        </Pressable>
      </View>
    </View>
    <View style={styles.header} className="absolute bg-zinc-600 z-20 w-full opacity-50" />
    <Image resizeMode="cover" style={styles.header} source={{ uri: headerImage }} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: width * 0.9,
  },
});

export default PostDetailHeader;
