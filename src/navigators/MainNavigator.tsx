import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogSplashScreen from '@screens/Blog/SplashScreen';
import WelcomeScreen from '@screens/Welcome';

import BlogNavigator from './BlogNavigator';

export type MainNavigatorParamList = {
  Welcome: undefined;
  BlogSplash: undefined;
  Blog: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="BlogSplash"
        component={BlogSplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Blog"
        component={BlogNavigator}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
