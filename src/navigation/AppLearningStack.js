import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AnimalsScreen from '../screens/AnimalsScreen';
import BirdsScreen from '../screens/BirdsScreen';
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


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Dummy drawer screens
function ShareAppScreen() {
  return null; // later add share UI
}
function SettingsScreen() {
  return null; // later add settings UI
}

/* Stack Navigator (your existing screens) */
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}   />
      <Stack.Screen name="Animals" component={AnimalsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Birds" component={BirdsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Numbers" component={NumbersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Alphabets" component={AlphabetsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Fruits" component={FruitsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Vegetables" component={VegetablesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Colors" component={ColorScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Flowers" component={FlowersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Sports" component={SportsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Insects" component={InsectsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Vehicles" component={VehiclesScreens} options={{ headerShown: false }} />
      <Stack.Screen name="Planets" component={PlanetsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BodyParts" component={BodyPartsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

/* Drawer wraps the Stack */
export default function AppLearningStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainStack">
        <Drawer.Screen name="MainStack" component={MainStack}  options={{ headerShown: false }}   />
        <Drawer.Screen name="Share our App" component={ShareAppScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
