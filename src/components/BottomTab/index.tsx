import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { text } from '@theme/text';
import { getHitSlop } from '@utils/helpers';
import { Bookmark, Compass, LayoutGrid } from 'lucide-react-native';
import { memo } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GetTabIcon = (screenName: 'Home' | 'Explore' | 'Saved', isActive: boolean) => {
  const className = isActive ? 'text-zinc-900 mb-1' : 'text-zinc-400 mb-1';

  switch (screenName) {
    case 'Home':
      return <LayoutGrid className={className} />;
    case 'Explore':
      return <Compass className={className} />;
    case 'Saved':
      return <Bookmark className={className} />;
    default:
      return null;
  }
};

const BottomNavigation = ({ navigation, state }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const onPressNavigate = (screen: string) => () => navigation.navigate(screen);

  return (
    <View className="border-t-b1 border-t-zinc-100 bg-zinc-50">
      <View
        className="pt-2 px-5 flex-row justify-between"
        style={{
          paddingBottom: Platform.select({
            ios: bottom,
            android: bottom + 16,
          }),
        }}>
        {state?.routeNames.map((route, index) => {
          const isActive = state.index === index;
          const title = route.split('Flow')?.[0]?.trim() as 'Home' | 'Explore' | 'Saved';

          return (
            <Pressable
              className="items-center"
              key={`bottomTab-${route}`}
              onPress={onPressNavigate(route)}
              hitSlop={getHitSlop({ value: 15 })}>
              {GetTabIcon(title, isActive)}
              <Text className={text({ tabTitleIsActive: isActive })}>{title}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default memo(BottomNavigation);
