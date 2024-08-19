import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAllHeatsData() {
    try {
        // Retrieve the data from AsyncStorage
        const storedHeats = await AsyncStorage.getItem('heats');

        // If there's data, parse it; otherwise, return an empty array
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        return heats; // Return the parsed data
    } catch (error) {
        console.error('Error retrieving heats data:', error);
        return []; // Return an empty array in case of an error
    }
}

export default getAllHeatsData;
