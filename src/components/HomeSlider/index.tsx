import categoryStore from '@store/CategoryStore';
import { PostType } from '@store/PostStore';
import { width } from '@utils/helpers';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import SliderDots from './SliderDots';
import SliderItem from './SliderItem';

export const SLIDER_ITEM_HEIGHT = width / 2;

export const SLIDER_PADDING_HORIZONTAL = 32;

export const SLIDER_ITEM_WIDTH = width - SLIDER_PADDING_HORIZONTAL;

type Props = {
  posts: PostType[];
  onPressPost: (post: PostType) => void;
};

const HomeSlider = ({ posts, onPressPost }: Props) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);

    if (index >= 0) {
      setSliderIndex(index);
    }
  };

  const RenderItem: ListRenderItem<PostType> = ({ item }) => (
    <SliderItem
      title={item.title}
      image={item.headerImage || ''}
      onPress={() => onPressPost(item)}
      categoryName={item.category || categoryStore.categoryName(item.categories || [])}
    />
  );

  return (
    <View className="mt-4">
      <FlatList
        horizontal
        pagingEnabled
        key="homeSlider"
        data={posts || []}
        onScroll={onScroll}
        removeClippedSubviews
        renderItem={RenderItem}
        decelerationRate="fast"
        snapToInterval={SLIDER_ITEM_WIDTH}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContent}
      />
      <SliderDots count={posts?.length} activeIndex={sliderIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContent: { paddingRight: 16 },
  sliderItemContainer: { width: SLIDER_ITEM_WIDTH, height: SLIDER_ITEM_HEIGHT },
});

export default observer(HomeSlider);
