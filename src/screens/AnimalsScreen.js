// src/screens/AnimalsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnimalsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animals List</Text>
    </View>
  );
};

export default AnimalsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: { fontSize: 24, fontWeight: 'bold' },
});
