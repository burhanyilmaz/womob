import Post from '@containers/Post';
import savedStore from '@store/SavedStore';
import { text } from '@theme/text';
import { BookMarked } from 'lucide-react-native';
import { observer } from 'mobx-react-lite';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

const SavedScreen = () => {
  const ListEmpty = () => (
    <View className="items-center mt-4">
      <BookMarked className="text-zinc-500 mb-2" size={28} />
      <Text className={text({ type: 'subtitle', class: 'text-zinc-600' })}>
        There is no saved posts.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        windowSize={6}
        className="px-5 pt-4"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        ListEmptyComponent={ListEmpty}
        data={savedStore.listResult || []}
        renderItem={({ item }) => <Post post={item} />}
      />
    </SafeAreaView>
  );
};

export default observer(SavedScreen);
