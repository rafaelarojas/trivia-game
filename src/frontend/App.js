import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NameScreen from './screens/NameScreen';
import GameScreen from './screens/GameScreen';
import LoseScreen from './screens/LoseScreen';
import WinScreen from './screens/WinScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Lose" component={LoseScreen} />
        <Stack.Screen name="Win" component={WinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
