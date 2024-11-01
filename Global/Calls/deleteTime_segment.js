import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export async function delete_time_segment_index(heatSeries, timeSegmentIndex) {
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

        // Remove the time segment at the specified index
        heat.time_segments.splice(timeSegmentIndex, 1);

        // Recalculate the total_duration of the heat after deletion
        heat.total_duration = heat.time_segments.reduce((total, segment) => total + segment.duration, 0);

        // Save the updated heats back to AsyncStorage
        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        await AsyncStorage.setItem('changings', "true");

        Alert.alert("Success",'Time segment deleted successfully.');
    } catch (error) {
        Alert.alert("Error",'Error deleting time segment');

        console.error('Error deleting time segment:', error);
    }
}
