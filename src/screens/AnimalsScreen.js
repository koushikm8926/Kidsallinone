// screens/AnimalScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import Ionicons from '@react-native-vector-icons/ionicons';



const { width, height } = Dimensions.get('window');

const animalData = [
  { id: '1', name: 'Fox',image: require('../assets/animals/fox.png') },
  { id: '2', name: 'Koala', image: require('../assets/animals/koala.png') },
  { id: '3', name: 'Owl',image: require('../assets/animals/owl.png') },
  { id: '4', name: 'Beaver',image: require('../assets/animals/beaver.png') },
  { id: '5', name: 'Black Bear',image: require('../assets/animals/black_bear.png') },
  { id: '6', name: 'Brown Bear',image: require('../assets/animals/brown_bear.png') },
  { id: '7', name: 'Cow',image: require('../assets/animals/cow.png') },
  { id: '8', name: 'Dear',image: require('../assets/animals/dear.png') },
  { id: '9', name: 'Eagle',image: require('../assets/animals/eagle.png') },
  { id: '10', name: 'Girraf',image: require('../assets/animals/girraf.png') },
  { id: '11', name: 'Hippopotamus',image: require('../assets/animals/hippopotamus.png') },
  { id: '12', name: 'Horse',image: require('../assets/animals/horse.png') },
  { id: '13', name: 'Lion',image: require('../assets/animals/lion.png') },
  { id: '14', name: 'Monkey',image: require('../assets/animals/monkey.png') },
  { id: '15', name: 'Moose',image: require('../assets/animals/moose.png') },
  { id: '16', name: 'Penguine',image: require('../assets/animals/penguin.png') },
  { id: '17', name: 'Pig',image: require('../assets/animals/pig.png') },
  { id: '18', name: 'Polar Bear',image: require('../assets/animals/polar_bear.png') },
  { id: '19', name: 'Rabbit',image: require('../assets/animals/rabbit.png') },
  { id: '20', name: 'Red Panda',image: require('../assets/animals/red_panda.png') },
  { id: '21', name: 'Rhinoceros',image: require('../assets/animals/rhinoceros.png') },
  { id: '22', name: 'Sheep',image: require('../assets/animals/sheep.png') },
  { id: '23', name: 'Wolf',image: require('../assets/animals/wolf.png') },
  { id: '24', name: 'Zebra',image: require('../assets/animals/zebra.png') },

];

const backgroundColors = [
  '#1a555d', 
  '#741941', 
  '#32272F',
  '#061220',
   '#B2D1D4',
   '#C9B672',
   '#5AA3C3',
  '#D51B4C',
  '#398BBD',
  '#8DC5D4',
  '#53A4A8',
  '#39538E',
  '#DB9F35',
  '#D6F0C0',
  '#3E503A',
  '#6E849B',
  '#B1C6A5',
  '#40477B',
  '#BC8281',
  '#9DD2BE',
  '#839D2F',
  '#6D6D9F',
  '#E0BD6B',
  '#4D2854',

]; 


// add head/tail clones for infinite loop
const loopedData = [
  { ...animalData[animalData.length - 1], id: 'head-clone', __clone: true },
  ...animalData,
  { ...animalData[0], id: 'tail-clone', __clone: true },
];

const AnimalScreen = () => {
  const flatListRef = useRef(null);
  const lastSpokenIndexRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  const speakAnimal = (realIndex, force = false) => {
    if (!animalData[realIndex]) return;
    if (!force && lastSpokenIndexRef.current === realIndex) return;

    try {
      Tts.stop();
      Tts.speak(animalData[realIndex].name);
      lastSpokenIndexRef.current = realIndex;
    } catch (err) {
      console.warn('TTS error:', err);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (flatListRef.current && !initialized) {
        flatListRef.current.scrollToIndex({ index: 1, animated: false });
        speakAnimal(0, true);
        setInitialized(true);
      }
    }, 50);
    return () => clearTimeout(t);
  }, [initialized]);




const renderItem = ({ item, index }) => {
  if (item.__clone) return <View style={{ width }} />;
  const realIndex = index - 1;
  return (
    <TouchableWithoutFeedback onPress={() => speakAnimal(realIndex, true)}>
      <View style={[styles.slide, { backgroundColor: backgroundColors[realIndex] }]}>
        {/* Image container with borderRadius */}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>

        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};



  
  const handleScrollEnd = (event) => {
    let index = Math.round(event.nativeEvent.contentOffset.x / width);

    if (index === 0) {
      flatListRef.current.scrollToIndex({ index: animalData.length, animated: false });
      speakAnimal(animalData.length - 1);
      return;
    }
    if (index === loopedData.length - 1) {
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
      speakAnimal(0);
      return;
    }

    const realIndex = index - 1;
    speakAnimal(realIndex);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
  


        {/* Center block for sliding */}
        <View style={styles.sliderWrapper}>
          <FlatList
            ref={flatListRef}
            data={loopedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
        </View>






      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AnimalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    width: '100%',
    //backgroundColor:'grey'
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
    color: '#FF6B6B', // vibrant color for kids
    marginTop: 2,
  },
girlImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginBottom: 15, // lifts the image upward
  // or you can use: alignSelf: 'flex-start',
},

  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'grey' ,// this is for debugging 
  

   
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
 imageContainer: {
  borderRadius: 16,     // rounded corners
  overflow: 'hidden',   // ensures image respects the border radius
},

image: {
  width: width * 0.7,
  height: height * 0.4,
  resizeMode: 'cover',  // fills the container nicely
},
  name: {
    fontSize: 28,
    fontWeight: '600',
    color:'white'
  },
});
