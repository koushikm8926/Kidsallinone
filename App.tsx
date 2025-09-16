import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const colors = [
    '#FF6B6B', '#FFD93D',
    '#6BCB77', '#4D96FF',
    '#FF6EC7', '#FF9F1C',
    '#845EC2', '#00C9A7',
    '#FF9671', '#FFC75F'
  ];

  const labels = [
    'Animals', 'Birds',
    'Numbers', 'Alphabets',
    'Fruits', 'Vegetables',
    'Colors', 'Flowers',
    'Organs', 'Shapes'
  ];

  const handlePress = (label) => {
    console.log(`${label} pressed`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: 2 }).map((_, colIndex) => {
              const cellIndex = rowIndex * 2 + colIndex;
              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[styles.cell, { backgroundColor: colors[cellIndex] }]}
                  activeOpacity={0.7}
                  onPress={() => handlePress(labels[cellIndex])}
                >
                  <Text style={styles.cellText}>{labels[cellIndex]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cell: {
    flex: 1,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
  },
});
