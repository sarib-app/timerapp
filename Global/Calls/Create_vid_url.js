import * as FileSystem from 'expo-file-system';

async function saveVideoToAppStorage(id, videoUri) {
  try {
    // Set the target path in your app’s document directory
    const uid = new Date().getTime().toString();

    const targetPath = `${FileSystem.documentDirectory}${uid}.mp4`;
    
    // Copy the file to the app’s storage
    await FileSystem.copyAsync({
      from: videoUri,
      to: targetPath,
    });
    
    // Save the new path to SQLite
    console.log("url",targetPath,videoUri);
    return targetPath
    // console.log("Video successfully saved in app storage and SQLite.");
    
  } catch (error) {
    console.error("Error copying video to app storage:", error);
  }
}

export default saveVideoToAppStorage
