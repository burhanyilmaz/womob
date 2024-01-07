import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '@screens/Test';

export type MainNavigatorParamList = {
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={TestScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
