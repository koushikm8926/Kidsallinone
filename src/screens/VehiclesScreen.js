import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons';
const VehiclesScreen = () => {
  return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>React Native Icons Test</Text>
      <Ionicons name="home" size={40} color="blue" />
     
    </View>
  )
}

export default VehiclesScreen

const styles = StyleSheet.create({})