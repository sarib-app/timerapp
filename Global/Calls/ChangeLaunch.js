import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

async function launchHeat(heatId) {
    try {
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Find the heat with the specified ID
        const heatIndex = heats.findIndex(h => h.id === heatId);

        if (heatIndex === -1) {
            console.warn('Heat object with the provided ID not found.');
            return false;
        }

        const heatToLaunch = heats[heatIndex];

        // Check if the heat is already launched
        if (heatToLaunch.launched) {
            Alert.alert('Already Launched', 'This heat is already launched.');
            return false;
        }

        // Set all other heats' launched attribute to false
        heats.forEach(heat => {
            heat.launched = false;
        });

        // Set the specified heat's launched attribute to true
        heatToLaunch.launched = true;
        heats[heatIndex] = heatToLaunch;

        // Save the updated heats data back to AsyncStorage
        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        console.log('Heat launched successfully.');
        await AsyncStorage.setItem('changings',"true")
        await AsyncStorage.setItem('chaning_type',"heat")

        await AsyncStorage.setItem('changing_made',"Heat Launched")
        await AsyncStorage.setItem('changed_id',String(heatId))


    Alert.alert("Success","Heat Launched SUccessfully!")


        return true;
    } catch (error) {
        console.error('Error launching heat:', error);
        return false;
    }
}

export default launchHeat;
