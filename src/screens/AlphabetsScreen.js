import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const colors = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#FF9F1C', '#845EC2', '#00C9A7', '#FF9671',
  '#FFC75F', '#B39CD0', '#FBEAFF', '#2EC4B6',
  '#E71D36', '#FFBE0B', '#8338EC', '#3A86FF',
  '#FF006E', '#FB5607', '#06D6A0', '#9B5DE5',
  '#F15BB5', '#00BBF9', '#00F5D4', '#D0F4DE',
  '#FFB5A7', '#C77DFF'
];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {Array.from({ length: 7 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: 4 }).map((_, colIndex) => {
            const cellIndex = rowIndex * 4 + colIndex;
            if (cellIndex >= letters.length) {
              // render an empty spacer to keep cell size consistent
              return <View key={colIndex} style={styles.spacer} />;
            }
            return (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.cell,
                  { backgroundColor: colors[cellIndex % colors.length] },
                ]}
                activeOpacity={0.7}
                onPress={() => console.log(letters[cellIndex])}
              >
                <Text style={styles.cellText}>{letters[cellIndex]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

export default AlphabetsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  cell: {
    flex: 1,
    height: 80,
    marginHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  spacer: {
    flex: 1, // takes same space as a cell
    marginHorizontal: 8,
  },
  cellText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
