import { text } from '@theme/text';
import { width } from '@utils/helpers';
import { Bookmark } from 'lucide-react-native';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CARD_IMAGE_WIDTH = (width - 40) * 0.3;
const CARD_IMAGE_HEIGHT = (width - 40) * 0.35;

type Props = {
  title?: string;
  image?: string;
  category?: string;
  onPressPost: () => void;
  onPressSave: () => void;
};

const PostCard = ({ image, title, category, onPressPost, onPressSave }: Props) => (
  <Pressable
    onPress={onPressPost}
    style={{ minHeight: 120 }}
    className="pb-4 bg-white border-b-b1 border-zinc-100 mb-4 flex-row">
    <View
      style={styles.cardImage}
      className="items-center justify-center bg-zinc-50 rounded-md overflow-hidden">
      {image ? (
        <Image source={{ uri: image }} className="mb-2 rounded-md" style={styles.cardImage} />
      ) : (
        <ActivityIndicator />
      )}
    </View>
    <View className="flex-1 ml-4 justify-between">
      <View>
        <View className="mb-2 h-5">
          <Text className={text({ type: 'subhead', class: 'text-zinc-500' })}>{category}</Text>
        </View>
        <Text className={text({ type: 'title4', class: 'text-zinc-900' })} numberOfLines={3}>
          {title}
        </Text>
      </View>
      <View className="bottom-0 left-0 w-full self-center justify-center items-end">
        <TouchableOpacity onPress={onPressSave}>
          <Bookmark className="text-zinc-300" />
        </TouchableOpacity>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  cardImage: { width: CARD_IMAGE_WIDTH, height: CARD_IMAGE_HEIGHT },
});

export default PostCard;
