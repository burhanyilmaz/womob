import { View } from 'react-native';

const SliderDots = ({ count = 0, activeIndex = 0 }) => (
  <View className="flex-row mb-2 self-center items-center">
    {Array(count)
      .fill('')
      .map((_, index) => (
        <View
          key={`${index}-dot`}
          className={
            activeIndex === index
              ? 'border-zinc-600 border-b1 h-2.5 w-2.5 rounded-md mr-3'
              : 'bg-zinc-600 h-2 w-2 rounded-md mr-3'
          }
        />
      ))}
  </View>
);

export default SliderDots;
