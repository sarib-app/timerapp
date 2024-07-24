import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Slider() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [unlocked, setUnlocked] = useState(false);
  const SLIDER_WIDTH = SCREEN_WIDTH - 100; // Adjusted width

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SLIDER_WIDTH * 0.6) { // Adjust threshold based on the new width
          Animated.spring(pan, {
            toValue: { x: SLIDER_WIDTH - 50, y: 0 }, // Adjusted target position
            useNativeDriver: false,
          }).start(() => {
            setUnlocked(true);
            console.log('unlocked');
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  return (
    // <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View
          style={[styles.slider, pan.getLayout()]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.sliderText}>{unlocked ? 'Unlocked' : 'Slide to Unlock'}</Text>
        </Animated.View>
      </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  sliderContainer: {
    width: SCREEN_WIDTH - 900,
    marginRight:200,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 30,
    justifyContent: 'center',
    padding: 5,
  },
  slider: {
    width: 100,
    height: 50,
    backgroundColor: '#4cbbb9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
