import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Welcome'}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TripExpenses"
          component={TripExpensesScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name="SignUp"
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
3