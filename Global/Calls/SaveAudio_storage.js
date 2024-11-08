import * as FileSystem from 'expo-file-system';

async function saveAudioToAppStorage(audioUri) {
  try {
    console.log(">>>>>cold cocceee",audioUri)
    // Generate a unique ID using the current timestamp
    const uid = new Date().getTime().toString();

    // Set the target path in the app’s document directory with `.mp3` extension
    const targetPath = `${FileSystem.documentDirectory}${uid}.m4a`;

    // Copy the audio file to the app’s storage
    await FileSystem.copyAsync({
      from: audioUri,
      to: targetPath,
    });

    // Return the new URI for the saved audio
    console.log("Audio saved at:", targetPath);
    return targetPath;

  } catch (error) {
    console.error("Error copying audio to app storage:", error);
  }
}

export default saveAudioToAppStorage;
