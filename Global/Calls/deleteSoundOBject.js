import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function deleteSoundFromTimeSegment(heatSeries, timeSegmentIndex, soundIndex) {
    try {
        // Retrieve stored heats
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Find the heat object with the specified heatSeries
        const heatIndex = heats.findIndex(h => h.type === 'heat' && h.heat_series === heatSeries);
        if (heatIndex === -1) {
            throw new Error(`Heat with series ${heatSeries} not found`);
        }

        const heat = heats[heatIndex];

        // Check if the timeSegmentIndex is valid
        if (timeSegmentIndex < 0 || timeSegmentIndex >= heat.time_segments.length) {
            throw new Error(`Invalid time segment index ${timeSegmentIndex}`);
        }

        const timeSegment = heat.time_segments[timeSegmentIndex];

        // Check if the soundIndex is valid
        if (soundIndex < 0 || soundIndex >= timeSegment.sounds.length) {
            throw new Error(`Invalid sound index ${soundIndex}`);
        }

        // Remove the sound object at the specified index
        timeSegment.sounds.splice(soundIndex, 1);

        // Save the updated heats back to AsyncStorage
        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        await AsyncStorage.setItem('changings', "true");
    await AsyncStorage.setItem('changing_made',"Sound deleted")
    await AsyncStorage.setItem('changed_id',String(heatSeries))

        Alert.alert("Success",'Sound deleted successfully from time segment.');

        console.log('Sound deleted successfully from time segment.');
    } catch (error) {
        Alert.alert("Error",'Error deleting sound from time segment:');

        console.error('', error);
    }
}
