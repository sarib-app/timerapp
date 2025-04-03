import AsyncStorage from '@react-native-async-storage/async-storage';

async function addSoundToTimeSegment(heatSeries, segmentIndex, soundData) {
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

        // Add the sound to the sounds array in the time segment
        heat.time_segments[segmentIndex].sounds.push(soundData);

        // Save the updated heats data back to AsyncStorage
        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        await AsyncStorage.setItem('changings',"true")
        await AsyncStorage.setItem('chaning_type',"heat")

    await AsyncStorage.setItem('changing_made',"Sound added")
    await AsyncStorage.setItem('changed_id',String(heatSeries))


        console.log('Sound added to time segment successfully.');

        return true;
    } catch (error) {
        console.error('Error adding sound to time segment:', error);
        return false;
    }
}

export default addSoundToTimeSegment;
