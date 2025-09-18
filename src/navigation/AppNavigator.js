import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AnimalsScreen from '../screens/AnimalsScreen';
import BirdsScren from '../screens/BirdsScreen';
import NumbersScreen from '../screens/NumbersScreen';
import BodyPartsScreen from '../screens/BodyPartsScreen';
import PlanetsScreen from '../screens/PlanetsScreen';
import InsectsScreen from "../screens/InsectsScreen";
import VehiclesScreens from "../screens/VehiclesScreen";
import ColorScreen from '../screens/ColorsScreen';
import FlowersScreen from '../screens/FlowersScreen';
import FruitsScreen from "../screens/FruitsScreen";
import AlphabetsScreen from "../screens/AlphabetsScreen";
import VegetablesScreen from "../screens/VegetablesScreen";
import SportsScreen from "../screens/SportsScreen";
import ShapesScreen from "../screens/ShapesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
          
          <Stack.Screen   name="Home"   component={HomeScreen}  options={{animation: 'slide_from_right',headerShown:false}} />
          
          <Stack.Screen name="Animals" component={AnimalsScreen} options={{animation: 'slide_from_right',headerShown:false}} />     
          <Stack.Screen  name="Birds"   component={BirdsScren}   options={{ headerShown: false }} />
         
          <Stack.Screen  name="Numbers"   component={NumbersScreen}   options={{ headerShown: false }} />          
          <Stack.Screen  name="Alphabets"   component={AlphabetsScreen}   options={{ headerShown: false }} />
          
          <Stack.Screen  name="Fruits"   component={FruitsScreen}   options={{ headerShown: false }} />       
          <Stack.Screen  name="Vegetables"   component={VegetablesScreen}   options={{ headerShown: false }} />
        
          <Stack.Screen  name="Colors"   component={ColorScreen}   options={{ headerShown: false }} />         
          <Stack.Screen  name="Flowers"   component={FlowersScreen}   options={{ headerShown: false }} />

          <Stack.Screen  name="Sports"   component={SportsScreen}   options={{ headerShown: false }} />         
          <Stack.Screen  name="Shapes"   component={ShapesScreen}   options={{ headerShown: false }} />
         
          <Stack.Screen  name="Insects"   component={InsectsScreen}   options={{ headerShown: false }} />
          <Stack.Screen  name="Vehicles"   component={VehiclesScreens}   options={{ headerShown: false }} />
         
          <Stack.Screen  name="Planets"   component={PlanetsScreen}   options={{ headerShown: false }} />        
          <Stack.Screen  name="Body Parts"   component={BodyPartsScreen}   options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
