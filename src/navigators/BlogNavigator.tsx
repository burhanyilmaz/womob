import BlogTabHeaderBackgroundImage from '@components/BlogTabHeader/BlogTabHeaderBackgroundImage';
import BlogTabHeaderGoBack from '@components/BlogTabHeader/BlogTabHeaderGoBack';
import BlogTabHeaderTitle from '@components/BlogTabHeader/BlogTabHeaderTitle';
import BottomTab from '@components/BottomTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '@screens/Blog/ExploreScreen';
import BlogHomeScreen from '@screens/Blog/HomeScreen';
import PostDetailScreen from '@screens/Blog/PostDetailScreen';
import SavedScreen from '@screens/Blog/SavedScreen';
import { PostType } from '@store/PostStore';

export type BlogTabNavigatorParamList = {
  Home: undefined;
  Saved: undefined;
  Explore: undefined;
  BlogSplash: undefined;
};

export type BlogStackNavigatorParamList = {
  BlogTab: undefined;
  PostDetail: {
    post: PostType;
  };
};

const Tab = createBottomTabNavigator<BlogTabNavigatorParamList>();

const Stack = createNativeStackNavigator<BlogStackNavigatorParamList>();

const BlogTab = () => (
  <Tab.Navigator
    tabBar={props => <BottomTab {...props} />}
    screenOptions={{
      lazy: true,
      headerLeft: BlogTabHeaderGoBack,
      headerBackground: BlogTabHeaderBackgroundImage,
      headerTitle: props => <BlogTabHeaderTitle title={props.children} />,
    }}>
    <Tab.Screen name="Home" component={BlogHomeScreen} />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Saved" component={SavedScreen} />
  </Tab.Navigator>
);

const BlogNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BlogTab" component={BlogTab} />
    <Stack.Screen
      name="PostDetail"
      component={PostDetailScreen}
      options={{ animation: 'slide_from_right' }}
    />
  </Stack.Navigator>
);

export default BlogNavigator;
