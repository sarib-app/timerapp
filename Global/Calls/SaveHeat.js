import AsyncStorage from '@react-native-async-storage/async-storage';
import lanesData from '../../Components/DataMOdules/DataList/Lanes';
async function saveHeatData(heatSeries, timeSegment) {
    try {
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        let newHeatSeries = heatSeries;
        let newHeatId = heats.length > 0 ? heats[heats.length - 1].id + 1 : 1;

        if (newHeatSeries === null) {
            // Create a new heat object
            const lastHeat = heats.filter(h => h.type === 'heat').pop();
            newHeatSeries = lastHeat ? lastHeat.heat_series + 1 : 1;

            const newHeat = {
                id: newHeatId,
                type: 'heat',
                heat_series: newHeatSeries,
                total_duration: timeSegment.duration,
                launched: false,
                time_segments: [timeSegment],
                lanes: lanesData,
            };

            heats.push(newHeat);
        } else {
            // Find existing heat object by heat_series and update it
            const existingHeatIndex = heats.findIndex(h => h.heat_series === newHeatSeries);

            if (existingHeatIndex !== -1) {
                const existingHeat = heats[existingHeatIndex];
                timeSegment.id = existingHeat.time_segments.length > 0 ? existingHeat.time_segments[existingHeat.time_segments.length - 1].id + 1 : 1;
                existingHeat.time_segments.push(timeSegment);
                existingHeat.total_duration += timeSegment.duration;
                heats[existingHeatIndex] = existingHeat;
            } else {
                console.warn('Heat object with the provided heat_series not found.');
                return null;
            }
        }

        await AsyncStorage.setItem('heats', JSON.stringify(heats));
        await AsyncStorage.setItem('changings',"true")
        await AsyncStorage.setItem('chaning_type',"heat")

    await AsyncStorage.setItem('changing_made',"Heat Data Saved")

    await AsyncStorage.setItem('changed_id',String(heatSeries))

        console.log('Heat data saved successfully.');

        // Return the heat_series after success
        return newHeatSeries;
    } catch (error) {
        console.error('Error saving heat data:', error);
        return null;
    }
}

export default saveHeatData;
