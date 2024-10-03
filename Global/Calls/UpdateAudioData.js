import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

async function updateSoundInTimeSegment(heatSeries, segmentIndex, audioIndex, updatedSoundData) {
    try {
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Find the specific heat by heat_series
        const heatIndex = heats.findIndex(h => h.heat_series === heatSeries);

        if (heatIndex === -1) {
            console.warn('Heat object with the provided heat_series not found.');
            return false;
        }

        const heat = heats[heatIndex];

        // Ensure the segmentIndex is within bounds
        if (segmentIndex < 0 || segmentIndex >= heat.time_segments.length) {
            console.warn('Time segment index out of bounds.');
            return false;
        }

        const timeSegment = heat.time_segments[segmentIndex];

        // Ensure the audioIndex is within bounds of the sounds array
        if (audioIndex < 0 || audioIndex >= timeSegment.sounds.length) {
            console.warn('Audio index out of bounds.');
            return false;
        }

        // Update the specific audio object at the given audioIndex
        timeSegment.sounds[audioIndex] = updatedSoundData;

        // Save the updated heats data back to AsyncStorage
        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        console.log('Sound updated successfully in the time segment.');
Alert.alert("Success","CUE updated successfully")
        return true;
    } catch (error) {
        console.error('Error updating sound in time segment:', error);
        return false;
    }
}

export default updateSoundInTimeSegment;
