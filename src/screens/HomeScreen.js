import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [greeting, setGreeting] = useState("");

useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 19) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  // Ref to hold the background music Sound instance
  const bgRef = useRef(null);
  // popRef is no longer needed

  // when screen is focused -> start bg music; when blurred -> stop & release
 // In HomeScreen.js

useFocusEffect(
  React.useCallback(() => {
    Sound.setCategory('Playback');

    const bg = new Sound('kids_music.mp3', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        console.warn('bg music load failed', err);
        return;
      }
      bg.setNumberOfLoops(-1);
      bg.setVolume(0.45);
      bg.play((success) => {
        if (!success) console.warn('bg music playback failed');
      });
    });
    bgRef.current = bg;

    // ✅ CORRECTED CLEANUP FUNCTION
    return () => {
      // Capture the current sound instance in a local variable.
      const soundInstance = bgRef.current;
      
      // Now, perform all operations on this stable variable.
      if (soundInstance) {
        soundInstance.stop(() => {
          soundInstance.release();
        });
      }
      
      // It's safe to nullify the ref here.
      bgRef.current = null;
    };
  }, [])
);

  // ✅ Simplified and more reliable handlePress function
  const handlePress = (screenName) => {
    // Create a new sound instance that plays once and then releases itself.
    // This is robust and prevents crashes.
    const popSound = new Sound('pop.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // Play the sound
      popSound.setVolume(0.8).play((success) => {
        if (success) {
          // Release the audio player resource once playback is complete
          popSound.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    // Navigate to the next screen
    navigation.navigate(screenName);
  };

  const colors = [
    '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6EC7', '#FF9F1C',
    '#47b8f2', '#00C9A7', '#FF9671', '#FFC75F', '#B39CD0', '#A8E6CF',
    '#2EC4B6', '#E71D36', '#FFBE0B', '#8338EC', '#3A86FF', '#FF006E',
    '#FB5607', '#06D6A0',
  ];

  const labels = [
    'Animals', 'Birds', 'Numbers', 'Alphabets', 'Fruits', 'Vegetables',
    'Colors', 'Flowers', 'Sports', 'Shapes', 'Insects', 'Vehicles',
    'Planets', 'Body Parts',
  ];

  const images = [
    require('../assets/Home/animal.webp'), require('../assets/Home/bird.webp'),
    require('../assets/Home/123.webp'), require('../assets/Home/abc.webp'),
    require('../assets/Home/fruits.webp'), require('../assets/Home/veg.png'),
    require('../assets/Home/color.webp'), require('../assets/Home/flowers.webp'),
    require('../assets/Home/sport.png'), require('../assets/Home/shape.png'),
    require('../assets/Home/insect.png'), require('../assets/Home/car.webp'),
    require('../assets/Home/earth.webp'), require('../assets/Home/boy.webp'),
  ];

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTextBlock}>
              <Ionicons name="menu-outline" size={35} color="#900" />
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.kidsText}>Kids</Text>
            </View>
            <Image
              source={require('../assets/Home/girl.png')}
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
                    if (cellIndex >= labels.length) return null;
                    return (
                      <TouchableOpacity
                        key={cellIndex}
                        style={[
                          styles.cell,
                          { backgroundColor: colors[cellIndex % colors.length] },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handlePress(labels[cellIndex])}
                      >
                        <View style={styles.cellLeftView}>
                          <Image
                            source={images[cellIndex]}
                            style={{ width: '150%', height: '100%', marginLeft: 15 }}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.cellRightView}>
                          <Text style={styles.cellText} numberOfLines={1}>
                            {labels[cellIndex]}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )
            )}
          </ScrollView>




          <View style={styles.footer}>
            <Text style={styles.footerText}>Ad space here</Text>
          </View>




          
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

// ... your styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    borderRadius: 16,
    flexDirection: 'row', // Added for horizontal layout
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  cellLeftView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    // No need for border radius here if the parent has it
  },
  cellRightView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  cellText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', // Ensure text is centered
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
  footerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default HomeScreen;