// src/screens/AnimalsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BirdsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Birds List</Text>
    </View>
  );
};

export default BirdsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: { fontSize: 24, fontWeight: 'bold' },
});
