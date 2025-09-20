import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@react-native-vector-icons/ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePress = label => {
    navigation.navigate(label); // navigate to screen with the same name
  };

  const colors = [
    '#FF6B6B',
    '#FFD93D',
    '#6BCB77',
    '#4D96FF',
    '#FF6EC7',
    '#FF9F1C',
    '#47b8f2',
    '#00C9A7',
    '#FF9671',
    '#FFC75F',
    '#B39CD0',
    '#A8E6CF',
    '#2EC4B6',
    '#E71D36',
    '#FFBE0B',
    '#8338EC',
    '#3A86FF',
    '#FF006E',
    '#FB5607',
    '#06D6A0',
  ];

  const labels = [
    'Animals',
    'Birds',
    'Numbers',
    'Alphabets',
    'Fruits',
    'Vegetables',
    'Colors',
    'Flowers',
    'Sports',
    'Shapes',
    'Insects',
    'Vehicles',
    'Planets',
    'Body Parts',
  ];


  const images = [
  require('../assets/animal.png'),
  require('../assets/bird.png'),
  require('../assets/123.png'),
  require('../assets/abc.png'),
  require('../assets/fruits.png'),
  require('../assets/veg.png'),
  require('../assets/color.png'),
  require('../assets/flowers.png'),
  require('../assets/sport.png'),
  require('../assets/shape.png'),
  require('../assets/insect.png'),
  require('../assets/car.png'),
  require('../assets/earth.png'),
  require('../assets/boy.png'),
];





  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {/* Left side text */}

          <View style={styles.headerTextBlock}>
            <Ionicons name="menu-outline" size={35} color="#900" />
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.kidsText}>Kids</Text>
          </View>

          {/* Right side image */}
          <Image
            source={require('../assets/girl2.png')} 
            style={styles.girlImage}
            resizeMode="contain"
          />
        </View>








        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Array.from({ length: Math.ceil(labels.length / 2) }).map(
            (_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {Array.from({ length: 2 }).map((_, colIndex) => {
                  const cellIndex = rowIndex * 2 + colIndex;
                  if (cellIndex >= labels.length) return null; // safety check
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      style={[
                        styles.cell,
                        {
                          backgroundColor: colors[cellIndex % colors.length],
                          flexDirection: 'row',
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => handlePress(labels[cellIndex])}
                    >
                      {/* Left side - Image (40%) */}
                      <View
                        style={styles.cellLeftView}
                      >
                        
                        <Image
                          source={images[cellIndex]}  
                          style={{ width: '150%', height: '100%',marginLeft:15, }}
                          resizeMode="contain"
                        />



                      </View>

                      {/* Right side - Text (60%) */}
                      <View
                        style={styles.cellRightView}>
                        <Text
                          style={styles.cellText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {labels[cellIndex]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ),
          )}
        </ScrollView>








        {/* Footer reserved for ads */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Ad space here</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    width: '100%',
    
  },
  headerTextBlock: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  kidsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B', 
    marginTop: 2,
  },
  girlImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15, 
  },

  scrollContent: {
    paddingBottom: 80, 
    flexGrow: 1, 
    marginTop: 10,
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
    color: '#fff', 
  },

cellRightView:{
                          flex: 0.6,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 5,
                        },
                        cellLeftView:{
                          flex: 0.4,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                        },

  footer: {
    height: 70,
    backgroundColor: '#4D96FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '93%', 
    alignSelf: 'center', 
    borderRadius: 8,
    marginTop: 10,
  },
});
