import { text } from '@theme/text';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { SLIDER_ITEM_HEIGHT, SLIDER_ITEM_WIDTH } from '.';

type Props = {
  image: string;
  title: string;
  onPress: () => void;
  categoryName: string;
};

const SliderItem = ({ image, categoryName, title, onPress }: Props) => (
  <Pressable className="bg-white mb-4 pl-4" style={styles.sliderItemContainer} onPress={onPress}>
    <View className="bg-zinc-100 mt-4 overflow-hidden rounded-lg  self-center">
      <ImageBackground
        source={{ uri: image }}
        className="rounded-lg justify-end overflow-hidden"
        style={styles.sliderImageBg}>
        <View className="rounded-lg absolute z-0 bg-black-o-40" style={styles.sliderImageBg} />
        <View className="px-4 mb-4">
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
      </ImageBackground>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  sliderContent: { paddingRight: 16 },
  sliderItemContainer: { width: SLIDER_ITEM_WIDTH, height: SLIDER_ITEM_HEIGHT, overflow: 'hidden' },
  sliderImageBg: { width: SLIDER_ITEM_WIDTH - 16, height: SLIDER_ITEM_HEIGHT - 16 },
});

export default SliderItem;
