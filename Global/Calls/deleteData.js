import AsyncStorage from '@react-native-async-storage/async-storage';

async function removeHeatById(id) {
  try {
    // Step 1: Get the existing heats data from AsyncStorage
    const heatsData = await AsyncStorage.getItem('heats');
    let heatsArray = JSON.parse(heatsData) || [];

    // Step 2: Filter out the object that matches the given ID
    const updatedHeatsArray = heatsArray.filter(heat => heat.id !== id);

    // Step 3: Save the updated array back to AsyncStorage
    await AsyncStorage.setItem('heats', JSON.stringify(updatedHeatsArray));
    await AsyncStorage.setItem('changings',"true")
    

    console.log(`Heat with ID: ${id} removed successfully`);
  } catch (error) {
    console.error('Error removing heat:', error);
  }
}

export default removeHeatById