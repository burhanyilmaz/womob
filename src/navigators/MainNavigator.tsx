import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '@screens/Welcome';

export type MainNavigatorParamList = {
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
