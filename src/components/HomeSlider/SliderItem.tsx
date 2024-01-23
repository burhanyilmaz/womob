import { text } from '@theme/text';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { SLIDER_ITEM_HEIGHT, SLIDER_ITEM_WIDTH } from '.';

type Props = {
  image: string;
  title: string;
  onPress: () => void;
  categoryName: string;
};

const SliderItem = ({ image, categoryName, title, onPress }: Props) => (
  <Pressable className="bg-white mb-4 pl-4" style={styles.sliderItemContainer} onPress={onPress}>
    <View
      className="bg-zinc-50 overflow-hidden rounded-lg justify-end"
      style={{ height: SLIDER_ITEM_HEIGHT }}>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={{ width: SLIDER_ITEM_WIDTH }}
        className="rounded-lg justify-end  absolute z-0 h-full"
      />
      <View
        className="rounded-lg absolute z-10 bg-black-o-40 h-full "
        style={{ width: SLIDER_ITEM_WIDTH }}
      />
      <View className="px-4 mb-4 z-20" style={{ width: SLIDER_ITEM_WIDTH - 16 }}>
        <View className="bg-zinc-50 rounded-full px-2 self-start  mb-3">
          <Text
            numberOfLines={1}
            className={text({
              type: 'subtitle1',
              class: 'text-zinc-800 my-1 min-w-[50px] text-center',
            })}>
            {categoryName}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          className={text({ type: 'title4', class: 'text-zinc-50 min-h-[36px]' })}>
          {title}
        </Text>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  sliderContent: { paddingRight: 16 },
  sliderItemContainer: { width: SLIDER_ITEM_WIDTH, height: SLIDER_ITEM_HEIGHT, overflow: 'hidden' },
  sliderImageBg: { width: SLIDER_ITEM_WIDTH - 16, height: SLIDER_ITEM_HEIGHT - 16 },
});

export default SliderItem;
