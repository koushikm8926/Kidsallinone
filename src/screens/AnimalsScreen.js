// screens/AnimalScreen.js
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import Ionicons from '@react-native-vector-icons/ionicons';
import Sound from 'react-native-sound';
import { Animated, Easing } from 'react-native';




// Get screen width & height for responsive design
const { width, height } = Dimensions.get('window');

/* -----------------------------------
   📌 Animal Data (images + names)
----------------------------------- */
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

/* -----------------------------------
   🎨 Background colors (per animal)
----------------------------------- */
const backgroundColors = [
  '#1a555d', '#741941', '#32272F', '#061220',
  '#B2D1D4', '#C9B672', '#5AA3C3', '#D51B4C',
  '#398BBD', '#8DC5D4', '#53A4A8', '#39538E',
  '#DB9F35', '#D6F0C0', '#3E503A', '#6E849B',
  '#B1C6A5', '#40477B', '#BC8281', '#9DD2BE',
  '#839D2F', '#6D6D9F', '#E0BD6B', '#4D2854',
];

/* -----------------------------------
   🔊 Play pop sound on back button
----------------------------------- */
const playPopSound = () => {
  const sound = new Sound('pop.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load sound', error);
      return;
    }
    sound.play(() => {
      sound.release();
    });
  });
};

/* -----------------------------------
   🔁 Loop Data (for infinite scroll)
   - Adds head & tail clones so user
     can swipe endlessly
----------------------------------- */
const loopedData = [
  { ...animalData[animalData.length - 1], id: 'head-clone', __clone: true },
  ...animalData,
  { ...animalData[0], id: 'tail-clone', __clone: true },
];

/* -----------------------------------
   🐾 AnimalScreen Component
----------------------------------- */
const AnimalScreen = ({ navigation }) => {

  // Refs
  const flatListRef = useRef(null);
  const lastSpokenIndexRef = useRef(null);

  // States
  const [initialized, setInitialized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current animal index

  // ------------------------
  // 🎬 Animated entrance values
  // ------------------------
  const topAnim = useRef(new Animated.Value(-500)).current;   // starts above screen
  const bottomAnim = useRef(new Animated.Value(500)).current; // starts below screen



  /* 🔊 Speak animal name */
  const speakAnimal = (realIndex, force = false) => {
    if (!animalData[realIndex]) return;
    if (!force && lastSpokenIndexRef.current === realIndex) return;

    try {
      Tts.stop(); // stop ongoing speech
      Tts.speak(animalData[realIndex].name); // speak animal name
      lastSpokenIndexRef.current = realIndex;
    } catch (err) {
      console.warn('TTS error:', err);
    }
  };

  /* 🚀 Initial scroll setup */
  useEffect(() => {
    const t = setTimeout(() => {
      if (flatListRef.current && !initialized) {
        flatListRef.current.scrollToIndex({ index: 1, animated: false });
        speakAnimal(0, true); // speak first animal
        setInitialized(true);
      }
    }, 50);
    return () => clearTimeout(t);
  }, [initialized]);

  // Go to next animal
const goNext = () => {
  let nextIndex = currentIndex + 1;
  if (nextIndex >= animalData.length) nextIndex = 0; // loop around
  flatListRef.current.scrollToIndex({ index: nextIndex + 1, animated: true }); // +1 because of head-clone
  setCurrentIndex(nextIndex);
  speakAnimal(nextIndex, true);
};


// Go to previous animal
const goPrev = () => {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) prevIndex = animalData.length - 1; // loop around
  flatListRef.current.scrollToIndex({ index: prevIndex + 1, animated: true }); // +1 because of head-clone
  setCurrentIndex(prevIndex);
  speakAnimal(prevIndex, true);
};

useEffect(() => {
  // Animate top image down and bottom image up
  Animated.parallel([
    Animated.timing(topAnim, {
      toValue: 0,            // final position
      duration: 900,        // increase duration for slow, smooth
      easing: Easing.inOut(Easing.ease), // smooth easing
      useNativeDriver: true, // recommended for better performance
    }),
    Animated.timing(bottomAnim, {
      toValue: 0,            // final position
      duration: 900,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }),
  ]).start();
}, []);



  /* 📸 Render each animal card */
const renderItem = ({ item, index }) => {
  if (item.__clone) return <View style={{ width }} />;
  const realIndex = index - 1;

  return (
    <View style={styles.slide}>
      {/* Make only image clickable */}
      <TouchableOpacity onPress={() => speakAnimal(realIndex, true)} activeOpacity={0.7}  style={styles.imageWrapper} >
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>


   

      {/* Animal name (not clickable) */}
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
};

  /* 🔁 Handle scroll loop + speech */
  const handleScrollEnd = (event) => {
    let index = Math.round(event.nativeEvent.contentOffset.x / width);

    if (index === 0) {
      // If at head clone → jump to last animal
      flatListRef.current.scrollToIndex({ index: animalData.length, animated: false });
      setCurrentIndex(animalData.length - 1);
      speakAnimal(animalData.length - 1);
      return;
    }
    if (index === loopedData.length - 1) {
      // If at tail clone → jump to first animal
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
      setCurrentIndex(0);
      speakAnimal(0);
      return;
    }

    // Normal case → update index & speak
    const realIndex = index - 1;
    setCurrentIndex(realIndex);
    speakAnimal(realIndex);
  };




  /* -----------------------------------
     🎨 UI Layout
  ----------------------------------- */
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: backgroundColors[currentIndex] }]}>
        
        {/* 🔙 Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              playPopSound();   // play sound
              navigation.goBack();  // navigate back
            }}
          >
            <Ionicons name="arrow-back" size={34} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 🐾 Animal Slider */}
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

 {/* ◉ Progress Dots */}
{/* 📊 Progress Bar */}
<View style={styles.progressBarBackground}>
  <View
    style={[
      styles.progressBarFill,
      { width: `${((currentIndex + 1) / (loopedData.length - 2)) * 100}%` }, // -2 because of clones
    ]}
  />
</View>

          {/* ⬅ Left Arrow */}
  <TouchableOpacity onPress={goPrev} style={styles.leftArrow}>
    <Ionicons name="chevron-back-circle" size={50} color="white" />
  </TouchableOpacity>

  {/* ➡ Right Arrow */}
  <TouchableOpacity onPress={goNext} style={styles.rightArrow}>
    <Ionicons name="chevron-forward-circle" size={50} color="white" />
  </TouchableOpacity>

    {/* 🌱 Grass Image at Bottom */}
    <Animated.Image
      source={require('../assets/animals/grass1.png')} // update path here
     style={[
    styles.grassImage,
    { transform: [{ translateY: bottomAnim }] } // animate Y from bottom
  ]}
      resizeMode="cover"
    />

<Animated.Image
  source={require('../assets/animals/creeper3.png')} // update path
    style={[
    styles.creeperImage,
    { transform: [{ translateY: topAnim }] } // animate Y from top
  ]}
  resizeMode="cover"
  
/>



      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AnimalScreen;

/* -----------------------------------
   🎨 Styles
----------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 55,
    left: 20,
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
  imageWrapper: {
  borderRadius: 16,      
  overflow: 'hidden',    
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
  leftArrow: {
  position: 'absolute',
  top: '55%',
  left: 2,
  zIndex: 10,
  transform: [{ translateY: -25 }], // vertically center
},
rightArrow: {
  position: 'absolute',
  top: '55%',
  right: 2,
  zIndex: 10,
  transform: [{ translateY: -25 }],
},
 grassImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 280,   // adjust depending on your design
    opacity: 0.9,  // slightly transparent
    zIndex: 1,     // stays behind arrows and text
  },
  creeperImage: {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 430,   // adjust depending on your design
  opacity: 0.9,  // optional for blending
  zIndex: 1,     // behind header & arrows
},
progressBarBackground: {
  position: 'absolute',
  bottom: 220,         // sits above grass
  left: 75,
  //right: 20,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'rgba(255,255,255,0.3)', // white faint background
  overflow: 'hidden',
  zIndex: 5,
  width:265,
},

progressBarFill: {
  height: '100%',
  borderRadius: 5,
  backgroundColor: '#FFD93D', // cheerful yellow (you can pick any kid-friendly color)
},

});
