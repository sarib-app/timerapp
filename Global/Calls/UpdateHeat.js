import AsyncStorage from '@react-native-async-storage/async-storage';

async function updateSegmentInHeatByIndex(heatSeries, segmentIndex, updatedSegmentData) {
    try {
        // Step 1: Get the stored heats data from AsyncStorage
        const storedHeats = await AsyncStorage.getItem('heats');
        let heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Step 2: Find the heat object with the given heatSeries
        const heatIndex = heats.findIndex(heat => heat.heat_series === heatSeries);

        if (heatIndex === -1) {
            console.warn(`Heat series ${heatSeries} not found.`);
            return null;
        }

        const heat = heats[heatIndex];

        // Step 3: Check if the provided segment index is valid
        if (segmentIndex < 0 || segmentIndex >= heat.time_segments.length) {
            console.warn(`Invalid segment index ${segmentIndex} for heat series ${heatSeries}.`);
            return null;
        }

        // Step 4: Update the segment's data based on the index
        heat.time_segments[segmentIndex] = {
            ...heat.time_segments[segmentIndex],
            ...updatedSegmentData,  // Merge the updated data into the existing segment
        };

        // Step 5: Recalculate the total duration based on all time segments
        heat.total_duration = heat.time_segments.reduce((total, segment) => total + segment.duration, 0);

        // Step 6: Save the updated heats array back to AsyncStorage
        heats[heatIndex] = heat;
        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        await AsyncStorage.setItem('changings',"true")

        console.log(`Segment at index ${segmentIndex} in heat series ${heatSeries} updated successfully.`);
        return heat;
    } catch (error) {
        console.error('Error updating heat segment:', error);
        return null;
    }
}

export default updateSegmentInHeatByIndex;
