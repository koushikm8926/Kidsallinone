// screens/AnimalScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import Ionicons from '@react-native-vector-icons/ionicons';

const { width, height } = Dimensions.get('window');

const animalData = [
  { id: '1', name: 'Fox', image: require('../assets/animals/fox.webp') },
  { id: '2', name: 'Koala', image: require('../assets/animals/koala.webp') },
  { id: '3', name: 'Owl', image: require('../assets/animals/owl.webp') },
  { id: '4', name: 'Beaver', image: require('../assets/animals/beaver.webp') },
  { id: '5', name: 'Black Bear', image: require('../assets/animals/black_bear.webp') },
  { id: '6', name: 'Brown Bear', image: require('../assets/animals/brown_bear.webp') },
  { id: '7', name: 'Cow', image: require('../assets/animals/cow.webp') },
  { id: '8', name: 'Dear', image: require('../assets/animals/dear.webp') },
  { id: '9', name: 'Eagle', image: require('../assets/animals/eagle.webp') },
  { id: '10', name: 'Girraf', image: require('../assets/animals/girraf.webp') },
  { id: '11', name: 'Hippopotamus', image: require('../assets/animals/hippopotamus.webp') },
  { id: '12', name: 'Horse', image: require('../assets/animals/horse.webp') },
  { id: '13', name: 'Lion', image: require('../assets/animals/lion.webp') },
  { id: '14', name: 'Monkey', image: require('../assets/animals/monkey.webp') },
  { id: '15', name: 'Moose', image: require('../assets/animals/moose.webp') },
  { id: '16', name: 'Penguine', image: require('../assets/animals/penguin.webp') },
  { id: '17', name: 'Pig', image: require('../assets/animals/pig.webp') },
  { id: '18', name: 'Polar Bear', image: require('../assets/animals/polar_bear.webp') },
  { id: '19', name: 'Rabbit', image: require('../assets/animals/rabbit.webp') },
  { id: '20', name: 'Red Panda', image: require('../assets/animals/red_panda.webp') },
  { id: '21', name: 'Rhinoceros', image: require('../assets/animals/rhinoceros.webp') },
  { id: '22', name: 'Sheep', image: require('../assets/animals/sheep.webp') },
  { id: '23', name: 'Wolf', image: require('../assets/animals/wolf.webp') },
  { id: '24', name: 'Zebra', image: require('../assets/animals/zebra.webp') },
];

const backgroundColors = [
  '#1a555d', '#741941', '#32272F', '#061220',
  '#B2D1D4', '#C9B672', '#5AA3C3', '#D51B4C',
  '#398BBD', '#8DC5D4', '#53A4A8', '#39538E',
  '#DB9F35', '#D6F0C0', '#3E503A', '#6E849B',
  '#B1C6A5', '#40477B', '#BC8281', '#9DD2BE',
  '#839D2F', '#6D6D9F', '#E0BD6B', '#4D2854',
];

// add head/tail clones for infinite loop
const loopedData = [
  { ...animalData[animalData.length - 1], id: 'head-clone', __clone: true },
  ...animalData,
  { ...animalData[0], id: 'tail-clone', __clone: true },
];

const AnimalScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const lastSpokenIndexRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // 👈 track current animal

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
        <View style={styles.slide}>
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
      setCurrentIndex(animalData.length - 1); // 👈 update bg
      speakAnimal(animalData.length - 1);
      return;
    }
    if (index === loopedData.length - 1) {
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
      setCurrentIndex(0); // 👈 update bg
      speakAnimal(0);
      return;
    }

    const realIndex = index - 1;
    setCurrentIndex(realIndex); // 👈 update bg
    speakAnimal(realIndex);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: backgroundColors[currentIndex] }]}>
        
        {/* 🔙 Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={34} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Slider */}
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
  },
  header: {
    position: 'absolute',
    top: 55,
    left: 20,
    //backgroundColor:'grey'
    zIndex: 10,
    elevation: 10, 
  },
  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
});
