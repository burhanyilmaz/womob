import Input from '@components/core/Input';
import Post from '@containers/Post';
import useDebounce from '@hooks/useDebounce';
import searchStore from '@store/SearchStore';
import colors from '@theme/colors';
import { Search } from 'lucide-react-native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';

const ExploreScreen = () => {
  const value = useDebounce(searchStore.term, 300);

  useEffect(() => {
    if (value.length > 2) {
      searchStore.searchPost();
    }
  }, [value]);

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
        data={searchStore.listResult || []}
        renderItem={({ item }) => <Post post={item} />}
      />
    </SafeAreaView>
  );
};

export default observer(ExploreScreen);
