import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AnimalsScreen from '../screens/AnimalsScreen';
import BirdsScren from '../screens/BirdsScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Animals" 
          component={AnimalsScreen} 
          options={{ headerShown: false }} 
        />
          <Stack.Screen  name="Birds"   component={BirdsScren}   options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
