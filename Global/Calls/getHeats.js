import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetchHeatData(heatSeries) {
    try {
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Find the heat object where type === 'heat' and heat_series === heatSeries
        const heatData = heats.find(h => h.type === 'heat' && h.heat_series === heatSeries);

        if (heatData) {
            return heatData;
        } else {
            console.warn(`No heat data found for heat_series ${heatSeries}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching heat data:', error);
        return null;
    }
}

export default fetchHeatData;
