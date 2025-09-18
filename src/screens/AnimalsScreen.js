// screens/AnimalScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';



const { width, height } = Dimensions.get('window');

const animalData = [
  { id: '1', name: 'Lion', image: { uri: 'https://media.istockphoto.com/id/1333977253/photo/male-lion-resting-on-a-rock.jpg?s=612x612&w=0&k=20&c=JZSHUW-GSk49vNiTGwRryqiG2H0HgDh0q7P1Ny985L4=' } },
  { id: '2', name: 'Elephant', image: { uri: 'https://a-z-animals.com/media/2022/09/shutterstock_2118427715-1024x711.jpg' } },
  { id: '3', name: 'Dog', image: { uri: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg' } },
  { id: '4', name: 'Cat', image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg' } },
  { id: '5', name: 'Tiger', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4NkmusstBoUBuvwN1tvEvaT6QaKQ7e_mHko2CsS9TqR1CpvUiRUZmFVBg67AOCQLLrNH6_DPxXXxl5vQEqodLp2xZmPVoRAIh_CZ8IpU' } },
  { id: '6', name: 'Giraffe', image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg' } },
  { id: '7', name: 'Zebra', image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Plains_Zebra_Equus_quagga.jpg' } },
  { id: '8', name: 'Monkey', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmBtc_PQxbCKWVmJAqVbobhpwFogCre-_HKsKovqahMwF4ztbkYGcfP9Xc6YDdD3ULWBQ&usqp=CAU' } },
  { id: '9', name: 'Horse', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ4RoSIAs7LuGYn5La5jajpGlznrZ_ictRpQ&s' } },
  { id: '10', name: 'Panda', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm2Qx8YYYGenxcsRtWqRknEzoAJv6eg4vJXg&s' } },
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
        <View style={styles.slide}>
          <Image source={item.image} style={styles.image} />
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
        {/* Static Header */}
        <View style={styles.header}>
           <Ionicons name="chevron-back-circle" color="#000" size={24} />
          <Text style={styles.headerText}>Animal</Text>
        </View>

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
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sliderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey' ,// this is for debugging 
  

   
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
  },
});
