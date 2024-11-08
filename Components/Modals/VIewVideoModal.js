import React, { useRef, useState } from 'react';
import { Modal, View, Button, StyleSheet, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { WindowHeight, WindowWidth } from '../../Global/components/Dimensions';

const { width, height } = Dimensions.get('window');

const FullScreenVideoModal = ({ videoUrl, isVisible, onClose }) => {
    const ref = useRef(null);

  return (
    <Modal
    visible={true}
    transparent={true}
    animationType="slide"
    supportedOrientations={['landscape', 'landscape-left', 'landscape-right']}
    statusBarTranslucent={true}
    >
      <View style={styles.container}>
        {/* Video Player */}
 <View
      style={styles.video}
 
 >



<Video
      ref={ref}
      style={styles.video}
      source={{
        uri: videoUrl,
      }}
      useNativeControls
    shouldPlay={true}
      resizeMode={ResizeMode.CONTAIN}
      isLooping
 
    />
 </View>

        {/* Close Button */}
        <Button
          title="Close"
          onPress={onClose}  // Function to close the modal
        />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
width:WindowWidth,height:WindowHeight,
justifyContent:'center',
alignItems:'center',
backgroundColor:"black"
  },
  video: {
    width: width/1.2,
    height: height/1.5  // Adjust to take most of the screen
  },
});

export default FullScreenVideoModal;
