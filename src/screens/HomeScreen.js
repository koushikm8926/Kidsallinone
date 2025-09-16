import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const  HomeScreen = ()=> {

   const navigation = useNavigation();

    const handlePress = (label) => {
    navigation.navigate(label); // navigate to screen with the same name
  };

const colors = [
  '#FF6B6B', '#FFD93D',
  '#6BCB77', '#4D96FF',
  '#FF6EC7', '#FF9F1C',
  '#845EC2', '#00C9A7',
  '#FF9671', '#FFC75F',
  '#B39CD0', '#FBEAFF',
  '#2EC4B6', '#E71D36',
  '#FFBE0B', '#8338EC',
  '#3A86FF', '#FF006E',
  '#FB5607', '#06D6A0',
];

const labels = [
  'Animals', 'Birds',
  'Numbers', 'Alphabets',
  'Fruits', 'Vegetables',
  'Colors', 'Flowers',
  'Sports', 'Shapes',
  'Insects', 'Vehicles',
  'Planets', 'Body Parts',
];

 
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

      <View style={styles.header}>
          <Text style={styles.headerText}>Kids All In One</Text>
      </View>



<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} >
  {Array.from({ length: Math.ceil(labels.length / 2) }).map((_, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {Array.from({ length: 2 }).map((_, colIndex) => {
        const cellIndex = rowIndex * 2 + colIndex;
        if (cellIndex >= labels.length) return null; // safety check
        return (
          <TouchableOpacity
            key={colIndex}
            style={[styles.cell, { backgroundColor: colors[cellIndex % colors.length] }]}
            activeOpacity={0.7}
            onPress={() => handlePress(labels[cellIndex])}
          >
            <Text style={styles.cellText}>{labels[cellIndex]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  ))}
</ScrollView>


             {/* Footer reserved for ads */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Ad space here</Text>
        </View>

        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default HomeScreen;

const styles = StyleSheet.create({
 container: {
  flex: 1,
  padding: 10,
  backgroundColor: '#fff',
},


header: {
  backgroundColor: '#FF6B6B',
  width: '93%',
  alignSelf: 'center',
  paddingVertical: 15,
  borderRadius: 10,
  marginBottom: 10,
  marginTop: 5,
  height: 100,
  justifyContent: 'center', // centers vertically
  alignItems: 'center',     // centers horizontally
},

headerText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
},


scrollContent: {
  paddingBottom: 80, // extra space for footer
  flexGrow: 1,       // ✅ ensures ScrollView expands
},


  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cell: {
    flex: 1,
    height: 90,
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
 footer: {
  height: 70, 
  backgroundColor: '#4D96FF',
  justifyContent: 'center',
  alignItems: 'center',
  width: '93%',        // ✅ same style as header for equal spacing
  alignSelf: 'center', // ✅ centers horizontally
  borderRadius: 8,
  marginTop: 10,       // little space from scroll/grid
},

});
