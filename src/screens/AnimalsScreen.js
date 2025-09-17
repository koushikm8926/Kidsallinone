// screens/AnimalScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';

const { width } = Dimensions.get('window');

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

// create looped data with head & tail clones
const loopedData = [
  { ...animalData[animalData.length - 1], id: 'head-clone', __clone: true },
  ...animalData,
  { ...animalData[0], id: 'tail-clone', __clone: true },
];

const AnimalScreen = () => {
  const flatListRef = useRef(null);
  const lastSpokenIndexRef = useRef(null); // prevents duplicate speak for same index
  const [initialised, setInitialised] = useState(false);

  // speak function: index is real animalData index (0..N-1)
  const speakAnimal = (realIndex, force = false) => {
    if (!animalData[realIndex]) return;
    if (!force && lastSpokenIndexRef.current === realIndex) {
      // already spoke this index recently — skip
      return;
    }

    try {
      Tts.stop();
      Tts.speak(animalData[realIndex].name);
      lastSpokenIndexRef.current = realIndex;
    } catch (err) {
      console.warn('TTS error:', err);
    }
  };

  // on mount: jump to first real item (index 1 in loopedData) and speak once
  useEffect(() => {
    // small timeout to ensure FlatList ref is ready
    const t = setTimeout(() => {
      if (flatListRef.current && !initialised) {
        flatListRef.current.scrollToIndex({ index: 1, animated: false }); // position to first real
        speakAnimal(0, true); // force speak first item exactly once
        setInitialised(true);
      }
    }, 50);
    return () => clearTimeout(t);
  }, [initialised]);

  // render item: use the looped data index to get realIndex = index-1
  const renderItem = ({ item, index }) => {
    if (item.__clone) {
      // render an empty slot for clones (keeps layout)
      return <View style={{ width }} />;
    }
    const realIndex = index - 1;
    return (
      <TouchableWithoutFeedback onPress={() => speakAnimal(realIndex, true)}>
        <View style={styles.itemContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Animal</Text>
          </View>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // on scroll settle, compute real index and speak (duplicates skipped by lastSpokenIndexRef)
  const handleScrollEnd = (event) => {
    let index = Math.round(event.nativeEvent.contentOffset.x / width);

    if (index === 0) {
      // reached head clone -> jump to last real item
      const jumpTo = animalData.length;
      flatListRef.current.scrollToIndex({ index: jumpTo, animated: false });
      const realIndex = animalData.length - 1;
      speakAnimal(realIndex);
      return;
    }

    if (index === loopedData.length - 1) {
      // reached tail clone -> jump to first real item
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
        <FlatList
          ref={flatListRef}
          data={loopedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AnimalScreen;

// styles below are kept as you had them
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  name: { fontSize: 26, fontWeight: '600' },
});
