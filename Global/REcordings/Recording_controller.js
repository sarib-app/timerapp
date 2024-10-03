import { Alert } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
export  const startRecordingasync = async () => {
    try {
      console.log('Requesting recording permissions...');
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone is required!');
        return;
      }
      await Audio.setAudioModeAsync({  allowsRecordingIOS: true,
        playsInSilentModeIOS: true,});

      console.log('Starting recording...');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
    //   console.log(recording)
    //   setRecording(recording);
    //   console.log('Recording started');
      return recording
    } catch (err) {
      console.error('Failed to start recording: ', err);
      return null
    }
  };

  export const stopRecordingasync = async (recording) => {
    console.log('Stopping recording...');
    // setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // Get the recorded audio URI
    // setAudioPath(uri);
    console.log('Recording stopped and stored at: ', uri);
    Alert.alert("Good",'Audio recorded successfully! Now hit the check button to save/update cue');
    return uri

   
  };


  export const uploadAudioasync = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
      if (result.type === 'success') {
        
        // setAudioPath(result.uri);
        console.log('Audio URI: ', result.uri);
        Alert.alert('Audio uploaded successfully!');
        return result.uri
      } else {
        console.log('Upload canceled');
        return null
      }
    } catch (err) {
      console.error('Error while uploading audio: ', err);
      return null
    }
  };